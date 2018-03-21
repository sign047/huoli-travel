// 获取选中区域的(x, y, w, h)
const getCropRect = cropperMovableItems => {
  let maxX = 0,
    maxY = 0;
  for (let key in cropperMovableItems) {
    let item = cropperMovableItems[key];
    maxX = item.x > maxX ? item.x : maxX;
    maxY = item.y > maxY ? item.y : maxY;
  }

  let minX = maxX,
    minY = maxY;
  for (let key in cropperMovableItems) {
    let item = cropperMovableItems[key];
    minX = item.x < minX ? item.x : minX;
    minY = item.y < minY ? item.y : minY;
  }
  return {
    x: minX,
    y: minY,
    w: maxX - minX,
    h: maxY - minY
  };
};

const getRandomStr = function(len) {
  var data = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
  ];
  var result = "";
  for (var i = 0; i < len; i++) {
    var r = Math.floor(Math.random() * data.length);
    if (r > data.length - 1) {
      r = data.length;
    }
    result += data[r];
  }

  return result;
};

// 获取适应屏幕的图片显示大小
const getAdjustSize = (W, H, width, height) => {
  if (width > W) {
    height = W / width * height;
    width = W;
  }

  if (height > H) {
    width = H / height * width;
    height = H;
  }

  return {
    width: width,
    height: height
  };
};
// http://www.geeksforgeeks.org/convex-hull-set-1-jarviss-algorithm-or-wrapping/
// To find orientation of ordered triplet (p, q, r).
// The function returns following values
// 0 --> p, q and r are colinear
// 1 --> Clockwise
// 2 --> Counterclockwise
function orientation(p, q, r) {
  var val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);

  if (val == 0) return 0; // collinear
  return val > 0 ? 1 : 2; // clock or counterclock wise
}

function convexHull(points, n) {
  if (n < 3) return;
  var hull = [];
  var l = 0;
  for (var i = 1; i < n; i++) {
    if (points[i].x < points[l].x) {
      l = i;
    }
  }
  var p = l,
    q;
  do {
    hull.push(points[p]);
    q = (p + 1) % n;
    for (var i = 0; i < n; i++) {
      if (orientation(points[p], points[i], points[q]) == 2) q = i;
    }
    p = q;
  } while (p != l); // While we don't come to first
  return hull;
}

function drawImageWithDegree(
  canvasId,
  path,
  width,
  height,
  degree,
  rotate,
  originalW,
  originalH
) {
  let ctx = wx.createCanvasContext(canvasId);
  let isVertical = degree % 180 > 0;
  // let drawWidth = isVertical ? height : width;
  // let drawHeight = isVertical ? width : height;
  let drawWidth = width,
    drawHeight = height,
    centerX,
    centerY,
    time = 0,
    drawCenterX = drawWidth / 2,
    drawcenterY = drawHeight / 2,
    d = Math.abs(width - height) / 2;
  ctx.save();
  if (rotate) {
    // if (isVertical) {
    //   centerX = height / 2;
    //   centerY = width / 2;
    // } else {
    centerX = width / 2;
    centerY = height / 2;
    // }
    ctx.translate(centerX, centerY);
    ctx.rotate(degree * Math.PI / 180);
    ctx.translate(-centerX, -centerY);
    // }
  }
  if (isVertical) {
    if (drawHeight > drawWidth) {
      ctx.drawImage(path, -d, d, drawHeight, drawWidth);
    } else {
      ctx.drawImage(path, d, -d, drawHeight, drawWidth);
    }
  } else {
    ctx.drawImage(path, 0, 0, drawWidth, drawHeight);
  }
  ctx.draw();
}

export {
  getCropRect,
  getAdjustSize,
  convexHull,
  drawImageWithDegree,
  getRandomStr
};
