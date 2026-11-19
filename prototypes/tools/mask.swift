// usage: swiftc -O mask.swift -o mask && ./mask   (see make-masks.sh)
// args: <photo.jpg> <out-mask.png> '<json {"keep":[[[x,y]..]..], "holes":[[[x,y]..]..]}>'
// Foreground mask from Apple Vision (on-device) ∩ keep polygons − hole polygons (normalised 0–1 coords),
// written as an RGBA PNG whose alpha channel is the mask (rgb = 0) so it stays small.
import Foundation
import Vision
import CoreGraphics
import ImageIO
import UniformTypeIdentifiers

let a = CommandLine.arguments
guard a.count >= 3 else { fputs("usage: mask <photo.jpg> <out-mask.png> [json]\n", stderr); exit(2) }
guard let src = CGImageSourceCreateWithURL(URL(fileURLWithPath: a[1]) as CFURL, nil),
      CGImageSourceGetCount(src) > 0 else {
  fputs("mask: cannot read image \(a[1])\n", stderr); exit(1)
}
let handler = VNImageRequestHandler(url: URL(fileURLWithPath: a[1]))
let req = VNGenerateForegroundInstanceMaskRequest()
try handler.perform([req])
guard let obs = req.results?.first else { print("no foreground"); exit(1) }
let buf = try obs.generateScaledMaskForImage(forInstances: obs.allInstances, from: handler)
CVPixelBufferLockBaseAddress(buf, .readOnly)
let W = CVPixelBufferGetWidth(buf), H = CVPixelBufferGetHeight(buf), rb = CVPixelBufferGetBytesPerRow(buf)
let base = CVPixelBufferGetBaseAddress(buf)!

struct Spec: Decodable { var keep: [[[Double]]]?; var holes: [[[Double]]]? }
let spec = try JSONDecoder().decode(Spec.self, from: (a.count > 3 ? a[3] : "{}").data(using: .utf8)!)

// rasterise keep/holes into an 8-bit gray buffer (CG origin is bottom-left → flip y)
let gctx = CGContext(data: nil, width: W, height: H, bitsPerComponent: 8, bytesPerRow: W, space: CGColorSpaceCreateDeviceGray(), bitmapInfo: CGImageAlphaInfo.none.rawValue)!
func path(_ poly: [[Double]]) -> CGPath { let p = CGMutablePath(); for (i, pt) in poly.enumerated() { let q = CGPoint(x: pt[0] * Double(W), y: (1 - pt[1]) * Double(H)); i == 0 ? p.move(to: q) : p.addLine(to: q) }; p.closeSubpath(); return p }
gctx.setFillColor(gray: spec.keep == nil ? 1 : 0, alpha: 1); gctx.fill(CGRect(x: 0, y: 0, width: W, height: H))
gctx.setFillColor(gray: 1, alpha: 1); for k in spec.keep ?? [] { gctx.addPath(path(k)); gctx.fillPath() }
gctx.setFillColor(gray: 0, alpha: 1); for h in spec.holes ?? [] { gctx.addPath(path(h)); gctx.fillPath() }
let g = gctx.data!.assumingMemoryBound(to: UInt8.self)   // row 0 = top row of the image in memory

var out = [UInt8](repeating: 0, count: W * H * 4)
var cover = 0
for y in 0..<H {
  let row = (base + y * rb).assumingMemoryBound(to: Float32.self)
  for x in 0..<W {
    let m = max(0, min(1, row[x])) * Float(g[y * W + x]) / 255
    let v = UInt8((m * 255).rounded())
    out[(y * W + x) * 4 + 3] = v
    if v > 127 { cover += 1 }
  }
}
CVPixelBufferUnlockBaseAddress(buf, .readOnly)
let provider = CGDataProvider(data: Data(out) as CFData)!
let img = CGImage(width: W, height: H, bitsPerComponent: 8, bitsPerPixel: 32, bytesPerRow: W * 4, space: CGColorSpaceCreateDeviceRGB(),
                  bitmapInfo: CGBitmapInfo(rawValue: CGImageAlphaInfo.premultipliedLast.rawValue), provider: provider, decode: nil, shouldInterpolate: false, intent: .defaultIntent)!
let dest = CGImageDestinationCreateWithURL(URL(fileURLWithPath: a[2]) as CFURL, UTType.png.identifier as CFString, 1, nil)!
CGImageDestinationAddImage(dest, img, nil); CGImageDestinationFinalize(dest)
print("wrote \(a[2]) \(W)x\(H) coverage \(String(format: "%.1f", Double(cover) * 100 / Double(W * H)))%")
