#!/bin/sh
# Regenerates prototypes/masks/*.png (bag cut-out masks used by accessory-composer.html).
# Needs macOS 14+ with Xcode command line tools: the foreground mask comes from Apple's
# on-device Vision framework (VNGenerateForegroundInstanceMaskRequest) — nothing is uploaded.
# Run from the repo root:  sh prototypes/tools/make-masks.sh
#
# Vision returns everything in the foreground (the hand holding LEN-01, the flower basket next
# to LEN-13), so each product can pass a JSON spec with normalised (0–1) polygons:
#   keep  — only pixels inside these polygons survive
#   holes — pixels inside these polygons are removed (e.g. the handle opening)
# Tip: open the composer, tick "Hiện điểm gắn" and click the photo to read coordinates.
set -e
cd "$(dirname "$0")/../.."
BIN="${TMPDIR:-/tmp}/mocsac-mask"
swiftc -O prototypes/tools/mask.swift -o "$BIN"
IMG=img/products
OUT=prototypes/masks
mkdir -p "$OUT"

"$BIN" "$IMG/len-01-tui-no-be.jpg" "$OUT/len-01-mask.png" \
  '{"keep":[[[0,0],[1,0],[1,0.66],[0.92,0.678],[0.84,0.69],[0.76,0.695],[0.70,0.696],[0.66,0.694],[0.62,0.703],[0.58,0.716],[0.54,0.729],[0.50,0.737],[0.40,0.741],[0.30,0.737],[0.20,0.726],[0.08,0.70],[0,0.69]]]}'

"$BIN" "$IMG/len-13-tui-tim-no-hong.jpg" "$OUT/len-13-mask.png" \
  '{"keep":[[[0.592,0.395],[0.70,0.391],[0.765,0.391],[0.77,0.34],[1,0.34],[1,1],[0.512,1],[0.517,0.675],[0.537,0.647],[0.558,0.612],[0.575,0.577],[0.586,0.542],[0.596,0.499]]],
    "holes":[[[0.618,0.491],[0.781,0.485],[0.891,0.502],[0.908,0.562],[0.921,0.681],[0.654,0.684],[0.612,0.672],[0.600,0.632],[0.603,0.576],[0.620,0.523]]]}'

"$BIN" "$IMG/len-19-tui-tote-xanh-trang.jpg" "$OUT/len-19-mask.png"
