//  значение оси Х в цифру
xAxisToNum = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
};
// цифру в значение оси Х
numToXaxis = {
  1: "A",
  2: "B",
  3: "C",
  4: "D",
  5: "E",
  6: "F",
  7: "G",
  8: "H",
};

var whiteCanWalk = true;

// добавление класса selectedFigure
function addClassSelected(object) {
  const lastSelectFigure = document.querySelector(".selectedFigure");
  if (lastSelectFigure == null) {
    object.classList.add("selectedFigure");
  } else {
    lastSelectFigure.classList.remove("selectedFigure");
    object.classList.add("selectedFigure");
  }
}
// удаление всех классов canWalk
function removeClassesCanWalk() {
  const allCellWithClassCanWalk = document.querySelectorAll(".canWalk");
  allCellWithClassCanWalk.forEach(function (cellWithClassCanWalk) {
    cellWithClassCanWalk.classList.remove("canWalk");
  });
}
// удаление всех классов canKill
function removeClassesCanKill() {
  const allCellWithClassCanKill = document.querySelectorAll(".canKill");
  allCellWithClassCanKill.forEach(function (cellWithClassCanKill) {
    cellWithClassCanKill.classList.remove("canKill");
  });
}

// удаление всех классов рокировки
function removeClassesCastling() {
  const allCellWithClassCastling = document.querySelectorAll(".castling");
  allCellWithClassCastling.forEach(function (cellWithClassCastling) {
    cellWithClassCastling.classList.remove("castling");
    cellWithClassCastling.classList.remove("right");
    cellWithClassCastling.classList.remove("left");
    cellWithClassCastling.classList.remove("whiteCastling");
    cellWithClassCastling.classList.remove("blackCastling");
  });
}

// удаление класса мертвой черной фигуры
function removeBlackDeadFigure(killCell) {
  killCell.classList.remove("blackFigure");
  if (killCell.closest(".castleBlack")) {
    killCell.classList.remove("castleBlack");
  } else if (killCell.closest(".knightBlack")) {
    killCell.classList.remove("knightBlack");
  } else if (killCell.closest(".bishopBlack")) {
    killCell.classList.remove("bishopBlack");
  } else if (killCell.closest(".queenBlack")) {
    killCell.classList.remove("queenBlack");
  } else if (killCell.closest(".kingBlack")) {
    killCell.classList.remove("kingBlack");
  } else if (killCell.closest(".pawnBlack")) {
    killCell.classList.remove("pawnBlack");
  }
}

// удаление класса мертвой белой фигуры
function removeWhiteDeadFigure(killCell) {
  killCell.classList.remove("whiteFigure");
  if (killCell.closest(".castleWhite")) {
    killCell.classList.remove("castleWhite");
  } else if (killCell.closest(".knightWhite")) {
    killCell.classList.remove("knightWhite");
  } else if (killCell.closest(".bishopWhite")) {
    killCell.classList.remove("bishopWhite");
  } else if (killCell.closest(".queenWhite")) {
    killCell.classList.remove("queenWhite");
  } else if (killCell.closest(".kingWhite")) {
    killCell.classList.remove("kingWhite");
  } else if (killCell.closest(".pawnWhite")) {
    killCell.classList.remove("pawnWhite");
  }
}

// порог превращения пешек
const transformWhitePawn = ["A8", "B8", "C8", "D8", "E8", "F8", "G8", "H8"];
const transformBlackPawn = ["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1"];

let transformCellId = "A0";

// открытие попапа для белой стороны
function WhitePopup(target) {
  transformWhitePawn.forEach(function (transformCell) {
    if (transformCell == target.id) {
      const popup = document.querySelector(".popupWhite");
      popup.classList.add("popupOpen");
      transformCellId = transformCell;
    }
  });
}

// открытие попапа для черной стороны
function BlackPopup(target) {
  transformBlackPawn.forEach(function (transformCell) {
    if (transformCell == target.id) {
      const popup = document.querySelector(".popupBlack");
      popup.classList.add("popupOpen");
      transformCellId = transformCell;
    }
  });
}

// трансформация белоый пешки

function transformFrorWhitePawn(transformCellId, event) {
  const transformPawnWhite = document.getElementById(transformCellId);
  const popup = document.querySelector(".popupWhite");
  popup.classList.remove("popupOpen");
  if (event.target.closest(".castleWhite")) {
    transformPawnWhite.classList.remove("pawnWhite");
    transformPawnWhite.classList.add("castleWhite");
  } else if (event.target.closest(".knightWhite")) {
    transformPawnWhite.classList.remove("pawnWhite");
    transformPawnWhite.classList.add("knightWhite");
  } else if (event.target.closest(".bishopWhite")) {
    transformPawnWhite.classList.remove("pawnWhite");
    transformPawnWhite.classList.add("bishopWhite");
  } else if (event.target.closest(".queenWhite")) {
    transformPawnWhite.classList.remove("pawnWhite");
    transformPawnWhite.classList.add("queenWhite");
  }
}

// трансформация черной пешки

function transformFrorBlackPawn(transformCellId, event) {
  const transformPawnBlack = document.getElementById(transformCellId);
  const popup = document.querySelector(".popupBlack");
  popup.classList.remove("popupOpen");
  if (event.target.closest(".castleBlack")) {
    transformPawnBlack.classList.remove("pawnBlack");
    transformPawnBlack.classList.add("castleBlack");
  } else if (event.target.closest(".knightBlack")) {
    transformPawnBlack.classList.remove("pawnBlack");
    transformPawnBlack.classList.add("knightBlack");
  } else if (event.target.closest(".bishopBlack")) {
    transformPawnBlack.classList.remove("pawnWhite");
    transformPawnBlack.classList.add("bishopBlack");
  } else if (event.target.closest(".queenBlack")) {
    transformPawnBlack.classList.remove("pawnBlack");
    transformPawnBlack.classList.add("queenBlack");
  }
}

// убийство
function kill(event) {
  removeClassesCanWalk();
  removeClassesCanKill();
  removeClassesCastling();
  const killCell = event.target;
  const chessCell = document.querySelector(".selectedFigure");
  if (chessCell.closest(".whiteFigure")) {
    removeBlackDeadFigure(killCell);
    if (chessCell.closest(".pawnWhite")) {
      chessCell.classList.remove("pawnWhite");
      chessCell.classList.remove("whiteFigure");
      killCell.classList.add("pawnWhite");
      killCell.classList.add("whiteFigure");
      WhitePopup(killCell);
    } else if (chessCell.closest(".castleWhite")) {
      chessCell.classList.remove("castleWhite");
      chessCell.classList.remove("whiteFigure");
      killCell.classList.add("castleWhite");
      killCell.classList.add("whiteFigure");
    } else if (chessCell.closest(".knightWhite")) {
      chessCell.classList.remove("knightWhite");
      chessCell.classList.remove("whiteFigure");
      killCell.classList.add("knightWhite");
      killCell.classList.add("whiteFigure");
    } else if (chessCell.closest(".bishopWhite")) {
      chessCell.classList.remove("bishopWhite");
      chessCell.classList.remove("whiteFigure");
      killCell.classList.add("bishopWhite");
      killCell.classList.add("whiteFigure");
    } else if (chessCell.closest(".queenWhite")) {
      chessCell.classList.remove("queenWhite");
      chessCell.classList.remove("whiteFigure");
      killCell.classList.add("queenWhite");
      killCell.classList.add("whiteFigure");
    } else if (chessCell.closest(".kingWhite")) {
      chessCell.classList.remove("kingWhite");
      chessCell.classList.remove("whiteFigure");
      killCell.classList.add("kingWhite");
      killCell.classList.add("whiteFigure");
    }
    whiteCanWalk = false;
  } else if (chessCell.closest(".blackFigure")) {
    removeWhiteDeadFigure(killCell);
    if (chessCell.closest(".pawnBlack")) {
      chessCell.classList.remove("pawnBlack");
      chessCell.classList.remove("blackFigure");
      killCell.classList.add("pawnBlack");
      killCell.classList.add("blackFigure");
      BlackPopup(killCell);
    } else if (chessCell.closest(".castleBlack")) {
      chessCell.classList.remove("castleBlack");
      chessCell.classList.remove("blackFigure");
      killCell.classList.add("castleBlack");
      killCell.classList.add("blackFigure");
    } else if (chessCell.closest(".knightBlack")) {
      chessCell.classList.remove("knightBlack");
      chessCell.classList.remove("blackFigure");
      killCell.classList.add("knightBlack");
      killCell.classList.add("blackFigure");
    } else if (chessCell.closest(".bishopBlack")) {
      chessCell.classList.remove("bishopBlack");
      chessCell.classList.remove("blackFigure");
      killCell.classList.add("bishopBlack");
      killCell.classList.add("blackFigure");
    } else if (chessCell.closest(".queenBlack")) {
      chessCell.classList.remove("queenBlack");
      chessCell.classList.remove("blackFigure");
      killCell.classList.add("queenBlack");
      killCell.classList.add("blackFigure");
    } else if (chessCell.closest(".kingBlack")) {
      chessCell.classList.remove("kingBlack");
      chessCell.classList.remove("blackFigure");
      killCell.classList.add("kingBlack");
      killCell.classList.add("blackFigure");
    }
    whiteCanWalk = true;
  }
}

// рокировка
function castling(event) {
  const castlingCell = event.target;
  const chessCell = document.querySelector(".selectedFigure");
  const idCell = chessCell.id;
  const axisXInStr = idCell[0];
  var axisX = xAxisToNum[axisXInStr];
  const axisY = Number(idCell[1]);
  if (castlingCell.closest(".whiteCastling")) {
    chessCell.classList.remove("kingWhite");
    chessCell.classList.remove("whiteFigure");
    castlingCell.classList.add("kingWhite");
    castlingCell.classList.add("whiteFigure");
    if (castlingCell.closest(".right")) {
      WhiteRightCastleForCastling = document.getElementById(
        idWhiteRightCastleForCastling
      );
      axisX++;
      axisX = numToXaxis[axisX];
      idWhiteRightCastleForAfterCastling = axisX + axisY;
      WhiteRightCastleForAfterCastling = document.getElementById(
        idWhiteRightCastleForAfterCastling
      );
      WhiteRightCastleForCastling.classList.remove("castleWhite");
      WhiteRightCastleForCastling.classList.remove("whiteFigure");
      WhiteRightCastleForAfterCastling.classList.add("castleWhite");
      WhiteRightCastleForAfterCastling.classList.add("whiteFigure");
    } else if (castlingCell.closest(".left")) {
      WhiteLeftCastleForCastling = document.getElementById(
        idWhiteLeftCastleForCastling
      );
      axisX--;
      axisX = numToXaxis[axisX];
      idWhiteLeftCastleForAfterCastling = axisX + axisY;
      WhiteLeftCastleForAfterCastling = document.getElementById(
        idWhiteLeftCastleForAfterCastling
      );
      WhiteLeftCastleForCastling.classList.remove("castleWhite");
      WhiteLeftCastleForCastling.classList.remove("whiteFigure");
      WhiteLeftCastleForAfterCastling.classList.add("castleWhite");
      WhiteLeftCastleForAfterCastling.classList.add("whiteFigure");
    }
    wasWhiteCastling = true;
    whiteCanWalk = false;
  } else if (castlingCell.closest(".blackCastling")) {
    console.log("ffff");
    chessCell.classList.remove("kingBlack");
    chessCell.classList.remove("blackFigure");
    castlingCell.classList.add("kingBlack");
    castlingCell.classList.add("blackFigure");
    if (castlingCell.closest(".right")) {
      BlackRightCastleForCastling = document.getElementById(
        idBlackRightCastleForCastling
      );
      axisX++;
      axisX = numToXaxis[axisX];
      idBlackRightCastleForAfterCastling = axisX + axisY;
      BlackRightCastleForAfterCastling = document.getElementById(
        idBlackRightCastleForAfterCastling
      );
      BlackRightCastleForCastling.classList.remove("castleBlack");
      BlackRightCastleForCastling.classList.remove("blackFigure");
      BlackRightCastleForAfterCastling.classList.add("castleBlack");
      BlackRightCastleForAfterCastling.classList.add("blackFigure");
    } else if (castlingCell.closest(".left")) {
      BlackLeftCastleForCastling = document.getElementById(
        idBlackLeftCastleForCastling
      );
      axisX--;
      axisX = numToXaxis[axisX];
      idBlackLeftCastleForAfterCastling = axisX + axisY;
      BlackLeftCastleForAfterCastling = document.getElementById(
        idBlackLeftCastleForAfterCastling
      );
      BlackLeftCastleForCastling.classList.remove("castleBlack");
      BlackLeftCastleForCastling.classList.remove("blackFigure");
      BlackLeftCastleForAfterCastling.classList.add("castleBlack");
      BlackLeftCastleForAfterCastling.classList.add("blackFigure");
    }
    wasBlackCastling = true;
    whiteCanWalk = true;
  }
  removeClassesCanWalk();
  removeClassesCanKill();
  removeClassesCastling();
}

// ход
function walk(event) {
  removeClassesCanWalk();
  removeClassesCanKill();
  removeClassesCastling();
  const walkCell = event.target;
  const chessCell = document.querySelector(".selectedFigure");
  if (chessCell.closest(".whiteFigure")) {
    if (chessCell.closest(".pawnWhite")) {
      chessCell.classList.remove("pawnWhite");
      chessCell.classList.remove("whiteFigure");
      walkCell.classList.add("pawnWhite");
      walkCell.classList.add("whiteFigure");
      WhitePopup(walkCell);
    } else if (chessCell.closest(".castleWhite")) {
      chessCell.classList.remove("castleWhite");
      chessCell.classList.remove("whiteFigure");
      walkCell.classList.add("castleWhite");
      walkCell.classList.add("whiteFigure");
    } else if (chessCell.closest(".knightWhite")) {
      chessCell.classList.remove("knightWhite");
      chessCell.classList.remove("whiteFigure");
      walkCell.classList.add("knightWhite");
      walkCell.classList.add("whiteFigure");
    } else if (chessCell.closest(".bishopWhite")) {
      chessCell.classList.remove("bishopWhite");
      chessCell.classList.remove("whiteFigure");
      walkCell.classList.add("bishopWhite");
      walkCell.classList.add("whiteFigure");
    } else if (chessCell.closest(".queenWhite")) {
      chessCell.classList.remove("queenWhite");
      chessCell.classList.remove("whiteFigure");
      walkCell.classList.add("queenWhite");
      walkCell.classList.add("whiteFigure");
    } else if (chessCell.closest(".kingWhite")) {
      chessCell.classList.remove("kingWhite");
      chessCell.classList.remove("whiteFigure");
      walkCell.classList.add("kingWhite");
      walkCell.classList.add("whiteFigure");
    }
    whiteCanWalk = false;
  } else if (chessCell.closest(".blackFigure")) {
    if (chessCell.closest(".pawnBlack")) {
      chessCell.classList.remove("pawnBlack");
      chessCell.classList.remove("blackFigure");
      walkCell.classList.add("pawnBlack");
      walkCell.classList.add("blackFigure");
      BlackPopup(walkCell);
    } else if (chessCell.closest(".castleBlack")) {
      chessCell.classList.remove("castleBlack");
      chessCell.classList.remove("blackFigure");
      walkCell.classList.add("castleBlack");
      walkCell.classList.add("blackFigure");
    } else if (chessCell.closest(".knightBlack")) {
      chessCell.classList.remove("knightBlack");
      chessCell.classList.remove("blackFigure");
      walkCell.classList.add("knightBlack");
      walkCell.classList.add("blackFigure");
    } else if (chessCell.closest(".bishopBlack")) {
      chessCell.classList.remove("bishopBlack");
      chessCell.classList.remove("blackFigure");
      walkCell.classList.add("bishopBlack");
      walkCell.classList.add("blackFigure");
    } else if (chessCell.closest(".queenBlack")) {
      chessCell.classList.remove("queenBlack");
      chessCell.classList.remove("blackFigure");
      walkCell.classList.add("queenBlack");
      walkCell.classList.add("blackFigure");
    } else if (chessCell.closest(".kingBlack")) {
      chessCell.classList.remove("kingBlack");
      chessCell.classList.remove("blackFigure");
      walkCell.classList.add("kingBlack");
      walkCell.classList.add("blackFigure");
    }
    whiteCanWalk = true;
  }
}

// логика движения белой пешки
function pawnWhiteWalkingLogic(axisY, axisX, chessCell) {
  sectionsForGo = [];
  sectionsForKill = [];
  if (axisY > 2) {
    axisY++;
    axisX = numToXaxis[axisX];
    canGo = axisX + axisY;
    sectionsForGo.push(canGo);
    sectionsForGo.forEach(function (CanGoIdCell) {
      if (document.getElementById(CanGoIdCell).closest(".blackFigure")) {
      } else {
        const CanGoCell = document.getElementById(CanGoIdCell);
        CanGoCell.classList.add("canWalk");
      }
    });
    axisX = xAxisToNum[axisX];
    axisX++;

    if (axisX < 9) {
      axisX = numToXaxis[axisX];
      canKill = axisX + axisY;
      sectionsForKill.push(canKill);
      axisX = xAxisToNum[axisX];
    }
    axisX--;
    axisX--;
    if (axisX > 0) {
      axisX = numToXaxis[axisX];
      canKill = axisX + axisY;
      sectionsForKill.push(canKill);
    }
    sectionsForKill.forEach(function (canKillIdCell) {
      const CanKillCell = document.getElementById(canKillIdCell);
      if (CanKillCell.closest(".blackFigure")) {
        CanKillCell.classList.add("canKill");
      }
    });
  } else {
    axisY++;
    axisX = numToXaxis[axisX];
    canGo = axisX + axisY;
    sectionsForGo.push(canGo);
    axisY++;
    canGo = axisX + axisY;
    sectionsForGo.push(canGo);
    sectionsForGo.forEach(function (CanGoIdCell) {
      const CanGoCell = document.getElementById(CanGoIdCell);
      if (CanGoCell.closest(".blackFigure")) {
        sectionsForGo.splice(1, 1);
      } else {
        CanGoCell.classList.add("canWalk");
      }
    });
    axisX = xAxisToNum[axisX];
    axisX++;
    axisY--;
    if (axisX < 9) {
      axisX = numToXaxis[axisX];
      canKill = axisX + axisY;
      sectionsForKill.push(canKill);
      axisX = xAxisToNum[axisX];
    }
    axisX--;
    axisX--;

    if (axisX > 0) {
      axisX = numToXaxis[axisX];
      canKill = axisX + axisY;
      sectionsForKill.push(canKill);
    }
    sectionsForKill.forEach(function (canKillIdCell) {
      const CanKillCell = document.getElementById(canKillIdCell);
      if (CanKillCell.closest(".blackFigure")) {
        CanKillCell.classList.add("canKill");
      }
    });
  }
}

// логика движения черной пешки
function pawnBlackWalkingLogic(axisY, axisX, chessCell) {
  sectionsForGo = [];
  sectionsForKill = [];
  if (axisY < 7) {
    axisY--;
    axisX = numToXaxis[axisX];
    canGo = axisX + axisY;
    sectionsForGo.push(canGo);
    sectionsForGo.forEach(function (CanGoIdCell) {
      if (document.getElementById(CanGoIdCell).closest(".whiteFigure")) {
      } else {
        const CanGoCell = document.getElementById(CanGoIdCell);

        CanGoCell.classList.add("canWalk");
      }
    });
    axisX = xAxisToNum[axisX];
    axisX++;
    if (axisX < 9) {
      axisX = numToXaxis[axisX];
      canKill = axisX + axisY;
      sectionsForKill.push(canKill);
      axisX = xAxisToNum[axisX];
    }
    axisX--;
    axisX--;
    console.log(axisX);

    if (axisX > 0) {
      axisX = numToXaxis[axisX];
      canKill = axisX + axisY;
      sectionsForKill.push(canKill);
      console.log(canKill);
    }
    sectionsForKill.forEach(function (canKillIdCell) {
      const CanKillCell = document.getElementById(canKillIdCell);
      if (CanKillCell.closest(".whiteFigure")) {
        CanKillCell.classList.add("canKill");
      }
    });
  } else {
    axisY--;
    axisX = numToXaxis[axisX];
    canGo = axisX + axisY;
    sectionsForGo.push(canGo);
    axisY--;
    canGo = axisX + axisY;
    sectionsForGo.push(canGo);
    sectionsForGo.forEach(function (CanGoIdCell) {
      const CanGoCell = document.getElementById(CanGoIdCell);
      if (CanGoCell.closest(".whiteFigure")) {
        sectionsForGo.splice(1, 1);
      } else {
        CanGoCell.classList.add("canWalk");
      }
    });
    axisX = xAxisToNum[axisX];
    axisY++;
    axisX++;
    if (axisX < 9) {
      axisX = numToXaxis[axisX];
      canKill = axisX + axisY;
      sectionsForKill.push(canKill);
      axisX = xAxisToNum[axisX];
    }
    axisX--;
    axisX--;
    console.log(axisX);

    if (axisX > 0) {
      axisX = numToXaxis[axisX];
      canKill = axisX + axisY;
      sectionsForKill.push(canKill);
    }
    sectionsForKill.forEach(function (canKillIdCell) {
      const CanKillCell = document.getElementById(canKillIdCell);
      if (CanKillCell.closest(".whiteFigure")) {
        CanKillCell.classList.add("canKill");
      }
    });
  }
}

// движение ладьи вверх
function castleWalkingUpLogic(axisY, axisX, chessCell) {
  axisX = numToXaxis[axisX];
  while (axisY < 8) {
    axisY++;
    canGo = axisX + axisY;
    sectionsForGoUp.push(canGo);
  }
  sectionsForGoUp.forEach(function (CanGoIdCell) {
    const CanGoCell = document.getElementById(CanGoIdCell);
    if (chessCell.closest(".whiteFigure") && whiteCanWalk == true) {
      if (CanGoCell.closest(".whiteFigure")) {
        sectionsForGoUp.splice(sectionsForGoUp.indexOf(CanGoIdCell), Infinity);
      } else if (CanGoCell.closest(".blackFigure")) {
        CanGoCell.classList.add("canKill");
        sectionsForGoUp.splice(sectionsForGoUp.indexOf(CanGoIdCell), Infinity);
      } else {
        CanGoCell.classList.add("canWalk");
      }
    } else if (chessCell.closest(".blackFigure") && whiteCanWalk == false) {
      if (CanGoCell.closest(".blackFigure")) {
        sectionsForGoUp.splice(sectionsForGoUp.indexOf(CanGoIdCell), Infinity);
      } else if (CanGoCell.closest(".whiteFigure")) {
        CanGoCell.classList.add("canKill");
        sectionsForGoUp.splice(sectionsForGoUp.indexOf(CanGoIdCell), Infinity);
      } else {
        CanGoCell.classList.add("canWalk");
      }
    }
  });
}

// движение ладьи вниз
function castleWalkingDownLogic(axisY, axisX, chessCell) {
  axisX = numToXaxis[axisX];
  while (axisY > 1) {
    axisY--;
    canGo = axisX + axisY;
    sectionsForGoDown.push(canGo);
  }
  sectionsForGoDown.forEach(function (CanGoIdCell) {
    const CanGoCell = document.getElementById(CanGoIdCell);
    if (chessCell.closest(".whiteFigure") && whiteCanWalk == true) {
      if (CanGoCell.closest(".whiteFigure")) {
        sectionsForGoDown.splice(
          sectionsForGoDown.indexOf(CanGoIdCell),
          Infinity
        );
      } else if (CanGoCell.closest(".blackFigure") && whiteCanWalk == false) {
        CanGoCell.classList.add("canKill");
        sectionsForGoDown.splice(
          sectionsForGoDown.indexOf(CanGoIdCell),
          Infinity
        );
      } else {
        CanGoCell.classList.add("canWalk");
      }
    } else if (chessCell.closest(".blackFigure")) {
      if (CanGoCell.closest(".blackFigure")) {
        sectionsForGoDown.splice(
          sectionsForGoDown.indexOf(CanGoIdCell),
          Infinity
        );
      } else if (CanGoCell.closest(".whiteFigure")) {
        CanGoCell.classList.add("canKill");
        sectionsForGoDown.splice(
          sectionsForGoDown.indexOf(CanGoIdCell),
          Infinity
        );
      } else {
        CanGoCell.classList.add("canWalk");
      }
    }
  });
}
// движение ладьи в право
function castleWalkingRightLogic(axisY, axisX, chessCell) {
  while (axisX < 8) {
    axisX++;
    axisX = numToXaxis[axisX];
    canGo = axisX + axisY;
    sectionsForGoRight.push(canGo);
    axisX = xAxisToNum[axisX];
  }
  sectionsForGoRight.forEach(function (CanGoIdCell) {
    const CanGoCell = document.getElementById(CanGoIdCell);
    if (chessCell.closest(".whiteFigure") && whiteCanWalk == true) {
      if (CanGoCell.closest(".whiteFigure")) {
        sectionsForGoRight.splice(
          sectionsForGoRight.indexOf(CanGoIdCell),
          Infinity
        );
      } else if (CanGoCell.closest(".blackFigure") && whiteCanWalk == false) {
        CanGoCell.classList.add("canKill");
        sectionsForGoRight.splice(
          sectionsForGoRight.indexOf(CanGoIdCell),
          Infinity
        );
      } else {
        CanGoCell.classList.add("canWalk");
      }
    } else if (chessCell.closest(".blackFigure")) {
      if (CanGoCell.closest(".blackFigure")) {
        sectionsForGoRight.splice(
          sectionsForGoRight.indexOf(CanGoIdCell),
          Infinity
        );
      } else if (CanGoCell.closest(".whiteFigure")) {
        CanGoCell.classList.add("canKill");
        sectionsForGoRight.splice(
          sectionsForGoRight.indexOf(CanGoIdCell),
          Infinity
        );
      } else {
        CanGoCell.classList.add("canWalk");
      }
    }
  });
}

// движение ладьи в лево
function castleWalkingLeftLogic(axisY, axisX, chessCell) {
  while (axisX > 1) {
    axisX--;
    axisX = numToXaxis[axisX];
    canGo = axisX + axisY;
    sectionsForGoLeft.push(canGo);
    axisX = xAxisToNum[axisX];
    console.log(axisX);
  }
  sectionsForGoLeft.forEach(function (CanGoIdCell) {
    const CanGoCell = document.getElementById(CanGoIdCell);
    if (chessCell.closest(".whiteFigure") && whiteCanWalk == true) {
      if (CanGoCell.closest(".whiteFigure")) {
        sectionsForGoLeft.splice(
          sectionsForGoLeft.indexOf(CanGoIdCell),
          Infinity
        );
      } else if (CanGoCell.closest(".blackFigure") && whiteCanWalk == false) {
        CanGoCell.classList.add("canKill");
        sectionsForGoLeft.splice(
          sectionsForGoLeft.indexOf(CanGoIdCell),
          Infinity
        );
      } else {
        CanGoCell.classList.add("canWalk");
      }
    } else if (chessCell.closest(".blackFigure")) {
      if (CanGoCell.closest(".blackFigure")) {
        sectionsForGoLeft.splice(
          sectionsForGoLeft.indexOf(CanGoIdCell),
          Infinity
        );
      } else if (CanGoCell.closest(".whiteFigure")) {
        CanGoCell.classList.add("canKill");
        sectionsForGoLeft.splice(
          sectionsForGoLeft.indexOf(CanGoIdCell),
          Infinity
        );
      } else {
        CanGoCell.classList.add("canWalk");
      }
    }
  });
}

// логика движения ладьи
function castleWalkingLogic(axisY, axisX, chessCell) {
  sectionsForGoUp = [];
  sectionsForGoDown = [];
  sectionsForGoRight = [];
  sectionsForGoLeft = [];
  sectionsForKill = [];
  castleWalkingUpLogic(axisY, axisX, chessCell);
  castleWalkingDownLogic(axisY, axisX, chessCell);
  castleWalkingRightLogic(axisY, axisX, chessCell);
  castleWalkingLeftLogic(axisY, axisX, chessCell);
}

// логика движения коня вверх

function knightWalkingUpLogic(axisY, axisX, chessCell) {
  axisY = axisY + 2;
  axisX--;
  if (axisY >= 1) {
    if (axisX >= 1) {
      if (axisY <= 8) {
        if (axisX <= 8) {
          axisX = numToXaxis[axisX];
          canGo = axisX + axisY;
          sectionsForGoUp.push(canGo);
          axisX = xAxisToNum[axisX];
        }
      }
    }
  }
  axisX = axisX + 2;
  if (axisY >= 1) {
    if (axisX >= 1) {
      if (axisY <= 8) {
        if (axisX <= 8) {
          axisX = numToXaxis[axisX];
          canGo = axisX + axisY;
          sectionsForGoUp.push(canGo);
        }
      }
    }
  }
  sectionsForGoUp.forEach(function (CanGoIdCell) {
    const CanGoCell = document.getElementById(CanGoIdCell);
    if (chessCell.closest(".whiteFigure") && whiteCanWalk == true) {
      if (CanGoCell.closest(".whiteFigure")) {
      } else if (CanGoCell.closest(".blackFigure")) {
        CanGoCell.classList.add("canKill");
      } else {
        CanGoCell.classList.add("canWalk");
      }
    } else if (chessCell.closest(".blackFigure") && whiteCanWalk == false) {
      if (CanGoCell.closest(".blackFigure")) {
      } else if (CanGoCell.closest(".whiteFigure")) {
        CanGoCell.classList.add("canKill");
      } else {
        CanGoCell.classList.add("canWalk");
      }
    }
  });
}

// логика движения коня вниз

function knightWalkingDownLogic(axisY, axisX, chessCell) {
  axisY = axisY - 2;
  axisX--;
  if (axisY >= 1) {
    if (axisX >= 1) {
      if (axisY <= 8) {
        if (axisX <= 8) {
          axisX = numToXaxis[axisX];
          canGo = axisX + axisY;
          sectionsForGoUp.push(canGo);
          axisX = xAxisToNum[axisX];
        }
      }
    }
  }
  axisX = axisX + 2;
  if (axisY >= 1) {
    if (axisX >= 1) {
      if (axisY <= 8) {
        if (axisX <= 8) {
          axisX = numToXaxis[axisX];
          canGo = axisX + axisY;
          sectionsForGoUp.push(canGo);
        }
      }
    }
  }
  sectionsForGoUp.forEach(function (CanGoIdCell) {
    const CanGoCell = document.getElementById(CanGoIdCell);
    if (chessCell.closest(".whiteFigure") && whiteCanWalk == true) {
      if (CanGoCell.closest(".whiteFigure")) {
      } else if (CanGoCell.closest(".blackFigure")) {
        CanGoCell.classList.add("canKill");
      } else {
        CanGoCell.classList.add("canWalk");
      }
    } else if (chessCell.closest(".blackFigure") && whiteCanWalk == false) {
      if (CanGoCell.closest(".blackFigure")) {
      } else if (CanGoCell.closest(".whiteFigure")) {
        CanGoCell.classList.add("canKill");
      } else {
        CanGoCell.classList.add("canWalk");
      }
    }
  });
}

// логика движения коня вправо

function knightWalkingRightLogic(axisY, axisX, chessCell) {
  axisX = axisX + 2;
  axisY--;
  if (axisY >= 1) {
    if (axisX >= 1) {
      if (axisY <= 8) {
        if (axisX <= 8) {
          axisX = numToXaxis[axisX];
          canGo = axisX + axisY;
          sectionsForGoUp.push(canGo);
          axisX = xAxisToNum[axisX];
        }
      }
    }
  }
  axisY = axisY + 2;
  if (axisY >= 1) {
    if (axisX >= 1) {
      if (axisY <= 8) {
        if (axisX <= 8) {
          axisX = numToXaxis[axisX];
          canGo = axisX + axisY;
          sectionsForGoUp.push(canGo);
        }
      }
    }
  }
  sectionsForGoUp.forEach(function (CanGoIdCell) {
    const CanGoCell = document.getElementById(CanGoIdCell);
    if (chessCell.closest(".whiteFigure") && whiteCanWalk == true) {
      if (CanGoCell.closest(".whiteFigure")) {
      } else if (CanGoCell.closest(".blackFigure")) {
        CanGoCell.classList.add("canKill");
      } else {
        CanGoCell.classList.add("canWalk");
      }
    } else if (chessCell.closest(".blackFigure") && whiteCanWalk == false) {
      if (CanGoCell.closest(".blackFigure")) {
      } else if (CanGoCell.closest(".whiteFigure")) {
        CanGoCell.classList.add("canKill");
      } else {
        CanGoCell.classList.add("canWalk");
      }
    }
  });
}

// логика движения коня влево

function knightWalkingLeftLogic(axisY, axisX, chessCell) {
  axisX = axisX - 2;
  axisY--;
  if (axisY >= 1) {
    if (axisX >= 1) {
      if (axisY <= 8) {
        if (axisX <= 8) {
          axisX = numToXaxis[axisX];
          canGo = axisX + axisY;
          sectionsForGoUp.push(canGo);
          axisX = xAxisToNum[axisX];
        }
      }
    }
  }
  axisY = axisY + 2;
  if (axisY >= 1) {
    if (axisX >= 1) {
      if (axisY <= 8) {
        if (axisX <= 8) {
          axisX = numToXaxis[axisX];
          canGo = axisX + axisY;
          sectionsForGoUp.push(canGo);
        }
      }
    }
  }
  sectionsForGoUp.forEach(function (CanGoIdCell) {
    const CanGoCell = document.getElementById(CanGoIdCell);
    if (chessCell.closest(".whiteFigure") && whiteCanWalk == true) {
      if (CanGoCell.closest(".whiteFigure")) {
      } else if (CanGoCell.closest(".blackFigure")) {
        CanGoCell.classList.add("canKill");
      } else {
        CanGoCell.classList.add("canWalk");
      }
    } else if (chessCell.closest(".blackFigure") && whiteCanWalk == false) {
      if (CanGoCell.closest(".blackFigure")) {
      } else if (CanGoCell.closest(".whiteFigure")) {
        CanGoCell.classList.add("canKill");
      } else {
        CanGoCell.classList.add("canWalk");
      }
    }
  });
}

// логика движения коня
function knightWalkingLogic(axisY, axisX, chessCell) {
  sectionsForGoUp = [];
  sectionsForGoDown = [];
  sectionsForGoRight = [];
  sectionsForGoLeft = [];
  sectionsForKill = [];
  knightWalkingUpLogic(axisY, axisX, chessCell);
  knightWalkingDownLogic(axisY, axisX, chessCell);
  knightWalkingRightLogic(axisY, axisX, chessCell);
  knightWalkingLeftLogic(axisY, axisX, chessCell);
}

// логика движение слона в правую верхнюю сторону
function bishopWalkingRightUpLogic(axisY, axisX, chessCell) {
  while (axisX >= 1 && axisX <= 8 && axisY >= 1 && axisY <= 8) {
    axisX++;
    axisY++;
    if (axisY < 9) {
      if (axisY > 0) {
        if (axisX < 9) {
          if (axisX > 0) {
            axisX = numToXaxis[axisX];
            canGo = axisX + axisY;
            sectionsForGoRightUp.push(canGo);
            axisX = xAxisToNum[axisX];
          }
        }
      }
    }
  }
  sectionsForGoRightUp.forEach(function (CanGoIdCell) {
    const CanGoCell = document.getElementById(CanGoIdCell);
    if (chessCell.closest(".whiteFigure") && whiteCanWalk == true) {
      if (CanGoCell.closest(".whiteFigure")) {
        sectionsForGoRightUp.splice(
          sectionsForGoRightUp.indexOf(CanGoIdCell),
          Infinity
        );
      } else if (CanGoCell.closest(".blackFigure")) {
        CanGoCell.classList.add("canKill");
        sectionsForGoRightUp.splice(
          sectionsForGoRightUp.indexOf(CanGoIdCell),
          Infinity
        );
      } else {
        CanGoCell.classList.add("canWalk");
      }
    } else if (chessCell.closest(".blackFigure") && whiteCanWalk == false) {
      if (CanGoCell.closest(".blackFigure")) {
        sectionsForGoRightUp.splice(
          sectionsForGoRightUp.indexOf(CanGoIdCell),
          Infinity
        );
      } else if (CanGoCell.closest(".whiteFigure")) {
        CanGoCell.classList.add("canKill");
        sectionsForGoRightUp.splice(
          sectionsForGoRightUp.indexOf(CanGoIdCell),
          Infinity
        );
      } else {
        CanGoCell.classList.add("canWalk");
      }
    }
  });
}

// логика движение слона в правую нижнюю сторону
function bishopWalkingRightDownLogic(axisY, axisX, chessCell) {
  while (axisX >= 1 && axisX <= 8 && axisY >= 1 && axisY <= 8) {
    axisX++;
    axisY--;
    if (axisY < 9) {
      if (axisY > 0) {
        if (axisX < 9) {
          if (axisX > 0) {
            axisX = numToXaxis[axisX];
            canGo = axisX + axisY;
            sectionsForGoRightDown.push(canGo);
            axisX = xAxisToNum[axisX];
          }
        }
      }
    }
  }
  sectionsForGoRightDown.forEach(function (CanGoIdCell) {
    const CanGoCell = document.getElementById(CanGoIdCell);
    if (chessCell.closest(".whiteFigure") && whiteCanWalk == true) {
      if (CanGoCell.closest(".whiteFigure")) {
        sectionsForGoRightDown.splice(
          sectionsForGoRightDown.indexOf(CanGoIdCell),
          Infinity
        );
      } else if (CanGoCell.closest(".blackFigure")) {
        CanGoCell.classList.add("canKill");
        sectionsForGoRightDown.splice(
          sectionsForGoRightDown.indexOf(CanGoIdCell),
          Infinity
        );
      } else {
        CanGoCell.classList.add("canWalk");
      }
    } else if (chessCell.closest(".blackFigure") && whiteCanWalk == false) {
      if (CanGoCell.closest(".blackFigure")) {
        sectionsForGoRightDown.splice(
          sectionsForGoRightDown.indexOf(CanGoIdCell),
          Infinity
        );
      } else if (CanGoCell.closest(".whiteFigure")) {
        CanGoCell.classList.add("canKill");
        sectionsForGoRightDown.splice(
          sectionsForGoRightDown.indexOf(CanGoIdCell),
          Infinity
        );
      } else {
        CanGoCell.classList.add("canWalk");
      }
    }
  });
}

// логика движения слона верхнюю левую сторону
function bishopWalkingLeftUpLogic(axisY, axisX, chessCell) {
  while (axisX >= 1 && axisX <= 8 && axisY >= 1 && axisY <= 8) {
    axisX--;
    axisY++;
    if (axisY < 9) {
      if (axisY > 0) {
        if (axisX < 9) {
          if (axisX > 0) {
            axisX = numToXaxis[axisX];
            canGo = axisX + axisY;
            sectionsForGoLeftUp.push(canGo);
            axisX = xAxisToNum[axisX];
          }
        }
      }
    }
  }
  sectionsForGoLeftUp.forEach(function (CanGoIdCell) {
    const CanGoCell = document.getElementById(CanGoIdCell);
    if (chessCell.closest(".whiteFigure") && whiteCanWalk == true) {
      if (CanGoCell.closest(".whiteFigure")) {
        sectionsForGoLeftUp.splice(
          sectionsForGoLeftUp.indexOf(CanGoIdCell),
          Infinity
        );
      } else if (CanGoCell.closest(".blackFigure")) {
        CanGoCell.classList.add("canKill");
        sectionsForGoLeftUp.splice(
          sectionsForGoLeftUp.indexOf(CanGoIdCell),
          Infinity
        );
      } else {
        CanGoCell.classList.add("canWalk");
      }
    } else if (chessCell.closest(".blackFigure") && whiteCanWalk == false) {
      if (CanGoCell.closest(".blackFigure")) {
        sectionsForGoLeftUp.splice(
          sectionsForGoLeftUp.indexOf(CanGoIdCell),
          Infinity
        );
      } else if (CanGoCell.closest(".whiteFigure")) {
        CanGoCell.classList.add("canKill");
        sectionsForGoLeftUp.splice(
          sectionsForGoLeftUp.indexOf(CanGoIdCell),
          Infinity
        );
      } else {
        CanGoCell.classList.add("canWalk");
      }
    }
  });
}

// логика движения слона нижнюю левую сторону

function bishopWalkingLeftDownLogic(axisY, axisX, chessCell) {
  while (axisX >= 1 && axisX <= 8 && axisY >= 1 && axisY <= 8) {
    axisX--;
    axisY--;
    if (axisY > 0) {
      if (axisY < 9) {
        if (axisX > 0) {
          if (axisX < 9) {
            axisX = numToXaxis[axisX];
            canGo = axisX + axisY;
            sectionsForGoLeftDown.push(canGo);
            axisX = xAxisToNum[axisX];
          }
        }
      }
    }
  }
  sectionsForGoLeftDown.forEach(function (CanGoIdCell) {
    const CanGoCell = document.getElementById(CanGoIdCell);
    if (chessCell.closest(".whiteFigure") && whiteCanWalk == true) {
      if (CanGoCell.closest(".whiteFigure")) {
        sectionsForGoLeftDown.splice(
          sectionsForGoLeftDown.indexOf(CanGoIdCell),
          Infinity
        );
      } else if (CanGoCell.closest(".blackFigure")) {
        CanGoCell.classList.add("canKill");
        sectionsForGoLeftDown.splice(
          sectionsForGoLeftDown.indexOf(CanGoIdCell),
          Infinity
        );
      } else {
        CanGoCell.classList.add("canWalk");
      }
    } else if (chessCell.closest(".blackFigure") && whiteCanWalk == false) {
      if (CanGoCell.closest(".blackFigure")) {
        sectionsForGoLeftDown.splice(
          sectionsForGoLeftDown.indexOf(CanGoIdCell),
          Infinity
        );
      } else if (CanGoCell.closest(".whiteFigure")) {
        CanGoCell.classList.add("canKill");
        sectionsForGoLeftDown.splice(
          sectionsForGoLeftDown.indexOf(CanGoIdCell),
          Infinity
        );
      } else {
        CanGoCell.classList.add("canWalk");
      }
    }
  });
}

// логика движения слона
function bishopWalkingLogic(axisY, axisX, chessCell) {
  sectionsForGoRightUp = [];
  sectionsForGoLeftUp = [];
  sectionsForGoRightDown = [];
  sectionsForGoLeftDown = [];
  bishopWalkingRightUpLogic(axisY, axisX, chessCell);
  bishopWalkingLeftUpLogic(axisY, axisX, chessCell);
  bishopWalkingRightDownLogic(axisY, axisX, chessCell);
  bishopWalkingLeftDownLogic(axisY, axisX, chessCell);
}

// логика движения королевы вправо вверх
function queenWalkingRightUpLogic(axisY, axisX, chessCell) {
  while (axisX >= 1 && axisX <= 8 && axisY >= 1 && axisY <= 8) {
    axisX++;
    axisY++;
    if (axisY < 9) {
      if (axisY > 0) {
        if (axisX < 9) {
          if (axisX > 0) {
            axisX = numToXaxis[axisX];
            canGo = axisX + axisY;
            sectionsForGoRightUp.push(canGo);
            axisX = xAxisToNum[axisX];
          }
        }
      }
    }
  }
  sectionsForGoRightUp.forEach(function (CanGoIdCell) {
    const CanGoCell = document.getElementById(CanGoIdCell);
    if (chessCell.closest(".whiteFigure") && whiteCanWalk == true) {
      if (CanGoCell.closest(".whiteFigure")) {
        sectionsForGoRightUp.splice(
          sectionsForGoRightUp.indexOf(CanGoIdCell),
          Infinity
        );
      } else if (CanGoCell.closest(".blackFigure")) {
        CanGoCell.classList.add("canKill");
        sectionsForGoRightUp.splice(
          sectionsForGoRightUp.indexOf(CanGoIdCell),
          Infinity
        );
      } else {
        CanGoCell.classList.add("canWalk");
      }
    } else if (chessCell.closest(".blackFigure") && whiteCanWalk == false) {
      if (CanGoCell.closest(".blackFigure")) {
        sectionsForGoRightUp.splice(
          sectionsForGoRightUp.indexOf(CanGoIdCell),
          Infinity
        );
      } else if (CanGoCell.closest(".whiteFigure")) {
        CanGoCell.classList.add("canKill");
        sectionsForGoRightUp.splice(
          sectionsForGoRightUp.indexOf(CanGoIdCell),
          Infinity
        );
      } else {
        CanGoCell.classList.add("canWalk");
      }
    }
  });
}

// логика движения королевы в лево вверх
function queenWalkingLeftUpLogic(axisY, axisX, chessCell) {
  while (axisX >= 1 && axisX <= 8 && axisY >= 1 && axisY <= 8) {
    axisX--;
    axisY++;
    if (axisY < 9) {
      if (axisY > 0) {
        if (axisX < 9) {
          if (axisX > 0) {
            axisX = numToXaxis[axisX];
            canGo = axisX + axisY;
            sectionsForGoLeftUp.push(canGo);
            axisX = xAxisToNum[axisX];
          }
        }
      }
    }
  }
  sectionsForGoLeftUp.forEach(function (CanGoIdCell) {
    const CanGoCell = document.getElementById(CanGoIdCell);
    if (chessCell.closest(".whiteFigure") && whiteCanWalk == true) {
      if (CanGoCell.closest(".whiteFigure")) {
        sectionsForGoLeftUp.splice(
          sectionsForGoLeftUp.indexOf(CanGoIdCell),
          Infinity
        );
      } else if (CanGoCell.closest(".blackFigure")) {
        CanGoCell.classList.add("canKill");
        sectionsForGoLeftUp.splice(
          sectionsForGoLeftUp.indexOf(CanGoIdCell),
          Infinity
        );
      } else {
        CanGoCell.classList.add("canWalk");
      }
    } else if (chessCell.closest(".blackFigure") && whiteCanWalk == false) {
      if (CanGoCell.closest(".blackFigure")) {
        sectionsForGoLeftUp.splice(
          sectionsForGoLeftUp.indexOf(CanGoIdCell),
          Infinity
        );
      } else if (CanGoCell.closest(".whiteFigure")) {
        CanGoCell.classList.add("canKill");
        sectionsForGoLeftUp.splice(
          sectionsForGoLeftUp.indexOf(CanGoIdCell),
          Infinity
        );
      } else {
        CanGoCell.classList.add("canWalk");
      }
    }
  });
}

// логика движения королевы вправо вниз
function queenWalkingRightDownLogic(axisY, axisX, chessCell) {
  while (axisX >= 1 && axisX <= 8 && axisY >= 1 && axisY <= 8) {
    axisX++;
    axisY--;
    if (axisY < 9) {
      if (axisY > 0) {
        if (axisX < 9) {
          if (axisX > 0) {
            axisX = numToXaxis[axisX];
            canGo = axisX + axisY;
            sectionsForGoRightDown.push(canGo);
            axisX = xAxisToNum[axisX];
          }
        }
      }
    }
  }
  sectionsForGoRightDown.forEach(function (CanGoIdCell) {
    const CanGoCell = document.getElementById(CanGoIdCell);
    if (chessCell.closest(".whiteFigure") && whiteCanWalk == true) {
      if (CanGoCell.closest(".whiteFigure")) {
        sectionsForGoRightDown.splice(
          sectionsForGoRightDown.indexOf(CanGoIdCell),
          Infinity
        );
      } else if (CanGoCell.closest(".blackFigure")) {
        CanGoCell.classList.add("canKill");
        sectionsForGoRightDown.splice(
          sectionsForGoRightDown.indexOf(CanGoIdCell),
          Infinity
        );
      } else {
        CanGoCell.classList.add("canWalk");
      }
    } else if (chessCell.closest(".blackFigure") && whiteCanWalk == false) {
      if (CanGoCell.closest(".blackFigure")) {
        sectionsForGoRightDown.splice(
          sectionsForGoRightDown.indexOf(CanGoIdCell),
          Infinity
        );
      } else if (CanGoCell.closest(".whiteFigure")) {
        CanGoCell.classList.add("canKill");
        sectionsForGoRightDown.splice(
          sectionsForGoRightDown.indexOf(CanGoIdCell),
          Infinity
        );
      } else {
        CanGoCell.classList.add("canWalk");
      }
    }
  });
}

// логика движения королевы в лево вниз
function queenWalkingLeftDownLogic(axisY, axisX, chessCell) {
  while (axisX >= 1 && axisX <= 8 && axisY >= 1 && axisY <= 8) {
    axisX--;
    axisY--;
    if (axisY > 0) {
      if (axisY < 9) {
        if (axisX > 0) {
          if (axisX < 9) {
            axisX = numToXaxis[axisX];
            canGo = axisX + axisY;
            sectionsForGoLeftDown.push(canGo);
            axisX = xAxisToNum[axisX];
          }
        }
      }
    }
  }
  sectionsForGoLeftDown.forEach(function (CanGoIdCell) {
    const CanGoCell = document.getElementById(CanGoIdCell);
    if (chessCell.closest(".whiteFigure") && whiteCanWalk == true) {
      if (CanGoCell.closest(".whiteFigure")) {
        sectionsForGoLeftDown.splice(
          sectionsForGoLeftDown.indexOf(CanGoIdCell),
          Infinity
        );
      } else if (CanGoCell.closest(".blackFigure")) {
        CanGoCell.classList.add("canKill");
        sectionsForGoLeftDown.splice(
          sectionsForGoLeftDown.indexOf(CanGoIdCell),
          Infinity
        );
      } else {
        CanGoCell.classList.add("canWalk");
      }
    } else if (chessCell.closest(".blackFigure") && whiteCanWalk == false) {
      if (CanGoCell.closest(".blackFigure")) {
        sectionsForGoLeftDown.splice(
          sectionsForGoLeftDown.indexOf(CanGoIdCell),
          Infinity
        );
      } else if (CanGoCell.closest(".whiteFigure")) {
        CanGoCell.classList.add("canKill");
        sectionsForGoLeftDown.splice(
          sectionsForGoLeftDown.indexOf(CanGoIdCell),
          Infinity
        );
      } else {
        CanGoCell.classList.add("canWalk");
      }
    }
  });
}

// логика движения королевы вверх
function queenWalkingUpLogic(axisY, axisX, chessCell) {
  axisX = numToXaxis[axisX];
  while (axisY < 8) {
    axisY++;
    canGo = axisX + axisY;
    sectionsForGoUp.push(canGo);
  }
  sectionsForGoUp.forEach(function (CanGoIdCell) {
    const CanGoCell = document.getElementById(CanGoIdCell);
    if (chessCell.closest(".whiteFigure") && whiteCanWalk == true) {
      if (CanGoCell.closest(".whiteFigure")) {
        sectionsForGoUp.splice(sectionsForGoUp.indexOf(CanGoIdCell), Infinity);
      } else if (CanGoCell.closest(".blackFigure")) {
        CanGoCell.classList.add("canKill");
        sectionsForGoUp.splice(sectionsForGoUp.indexOf(CanGoIdCell), Infinity);
      } else {
        CanGoCell.classList.add("canWalk");
      }
    } else if (chessCell.closest(".blackFigure") && whiteCanWalk == false) {
      if (CanGoCell.closest(".blackFigure")) {
        sectionsForGoUp.splice(sectionsForGoUp.indexOf(CanGoIdCell), Infinity);
      } else if (CanGoCell.closest(".whiteFigure")) {
        CanGoCell.classList.add("canKill");
        sectionsForGoUp.splice(sectionsForGoUp.indexOf(CanGoIdCell), Infinity);
      } else {
        CanGoCell.classList.add("canWalk");
      }
    }
  });
}

// логика движения королевы вправо
function queenWalkingRightLogic(axisY, axisX, chessCell) {
  while (axisX < 8) {
    axisX++;
    axisX = numToXaxis[axisX];
    canGo = axisX + axisY;
    sectionsForGoRight.push(canGo);
    axisX = xAxisToNum[axisX];
  }
  sectionsForGoRight.forEach(function (CanGoIdCell) {
    const CanGoCell = document.getElementById(CanGoIdCell);
    if (chessCell.closest(".whiteFigure") && whiteCanWalk == true) {
      if (CanGoCell.closest(".whiteFigure")) {
        sectionsForGoRight.splice(
          sectionsForGoRight.indexOf(CanGoIdCell),
          Infinity
        );
      } else if (CanGoCell.closest(".blackFigure")) {
        CanGoCell.classList.add("canKill");
        sectionsForGoRight.splice(
          sectionsForGoRight.indexOf(CanGoIdCell),
          Infinity
        );
      } else {
        CanGoCell.classList.add("canWalk");
      }
    } else if (chessCell.closest(".blackFigure") && whiteCanWalk == false) {
      if (CanGoCell.closest(".blackFigure")) {
        sectionsForGoRight.splice(
          sectionsForGoRight.indexOf(CanGoIdCell),
          Infinity
        );
      } else if (CanGoCell.closest(".whiteFigure")) {
        CanGoCell.classList.add("canKill");
        sectionsForGoRight.splice(
          sectionsForGoRight.indexOf(CanGoIdCell),
          Infinity
        );
      } else {
        CanGoCell.classList.add("canWalk");
      }
    }
  });
}

// логика движения королевы вниз
function queenWalkingDownLogic(axisY, axisX, chessCell) {
  axisX = numToXaxis[axisX];
  while (axisY > 1) {
    axisY--;
    canGo = axisX + axisY;
    sectionsForGoDown.push(canGo);
  }
  sectionsForGoDown.forEach(function (CanGoIdCell) {
    const CanGoCell = document.getElementById(CanGoIdCell);
    if (chessCell.closest(".whiteFigure") && whiteCanWalk == true) {
      if (CanGoCell.closest(".whiteFigure")) {
        sectionsForGoDown.splice(
          sectionsForGoDown.indexOf(CanGoIdCell),
          Infinity
        );
      } else if (CanGoCell.closest(".blackFigure")) {
        CanGoCell.classList.add("canKill");
        sectionsForGoDown.splice(
          sectionsForGoDown.indexOf(CanGoIdCell),
          Infinity
        );
      } else {
        CanGoCell.classList.add("canWalk");
      }
    } else if (chessCell.closest(".blackFigure") && whiteCanWalk == false) {
      if (CanGoCell.closest(".blackFigure")) {
        sectionsForGoDown.splice(
          sectionsForGoDown.indexOf(CanGoIdCell),
          Infinity
        );
      } else if (CanGoCell.closest(".whiteFigure")) {
        CanGoCell.classList.add("canKill");
        sectionsForGoDown.splice(
          sectionsForGoDown.indexOf(CanGoIdCell),
          Infinity
        );
      } else {
        CanGoCell.classList.add("canWalk");
      }
    }
  });
}

// логика движения королевы в лево
function queenWalkingLeftLogic(axisY, axisX, chessCell) {
  while (axisX > 1) {
    axisX--;
    axisX = numToXaxis[axisX];
    canGo = axisX + axisY;
    sectionsForGoLeft.push(canGo);
    axisX = xAxisToNum[axisX];
  }
  sectionsForGoLeft.forEach(function (CanGoIdCell) {
    const CanGoCell = document.getElementById(CanGoIdCell);
    if (chessCell.closest(".whiteFigure") && whiteCanWalk == true) {
      if (CanGoCell.closest(".whiteFigure")) {
        sectionsForGoLeft.splice(
          sectionsForGoLeft.indexOf(CanGoIdCell),
          Infinity
        );
      } else if (CanGoCell.closest(".blackFigure")) {
        CanGoCell.classList.add("canKill");
        sectionsForGoLeft.splice(
          sectionsForGoLeft.indexOf(CanGoIdCell),
          Infinity
        );
      } else {
        CanGoCell.classList.add("canWalk");
      }
    } else if (chessCell.closest(".blackFigure") && whiteCanWalk == false) {
      if (CanGoCell.closest(".blackFigure")) {
        sectionsForGoLeft.splice(
          sectionsForGoLeft.indexOf(CanGoIdCell),
          Infinity
        );
      } else if (CanGoCell.closest(".whiteFigure")) {
        CanGoCell.classList.add("canKill");
        sectionsForGoLeft.splice(
          sectionsForGoLeft.indexOf(CanGoIdCell),
          Infinity
        );
      } else {
        CanGoCell.classList.add("canWalk");
      }
    }
  });
}

// логика движения королевы
function queenWalkingLogic(axisY, axisX, chessCell) {
  sectionsForGoRightUp = [];
  sectionsForGoLeftUp = [];
  sectionsForGoRightDown = [];
  sectionsForGoLeftDown = [];
  sectionsForGoUp = [];
  sectionsForGoDown = [];
  sectionsForGoRight = [];
  sectionsForGoLeft = [];
  queenWalkingRightUpLogic(axisY, axisX, chessCell);
  queenWalkingLeftUpLogic(axisY, axisX, chessCell);
  queenWalkingRightDownLogic(axisY, axisX, chessCell);
  queenWalkingLeftDownLogic(axisY, axisX, chessCell);
  queenWalkingUpLogic(axisY, axisX, chessCell);
  queenWalkingLeftLogic(axisY, axisX, chessCell);
  queenWalkingDownLogic(axisY, axisX, chessCell);
  queenWalkingRightLogic(axisY, axisX, chessCell);
}

// логика двиения короля в право вверх
function kingWalkingRightUpLogic(axisY, axisX) {
  axisX++;
  axisY++;
  if (axisY <= 8) {
    if (axisY >= 1) {
      if (axisX <= 8) {
        if (axisX >= 1) {
          axisX = numToXaxis[axisX];
          canGo = axisX + axisY;
          sectionsForGo.push(canGo);
        }
      }
    }
  }
}
// логика двиения короля в лево вверх
function kingWalkingLeftUpLogic(axisY, axisX) {
  axisX--;
  axisY++;
  if (axisY <= 8) {
    if (axisY >= 1) {
      if (axisX <= 8) {
        if (axisX >= 1) {
          axisX = numToXaxis[axisX];
          canGo = axisX + axisY;
          sectionsForGo.push(canGo);
        }
      }
    }
  }
}
// логика двиения короля в право вниз
function kingWalkingRightDownLogic(axisY, axisX) {
  axisX++;
  axisY--;
  if (axisY <= 8) {
    if (axisY >= 1) {
      if (axisX <= 8) {
        if (axisX >= 1) {
          axisX = numToXaxis[axisX];
          canGo = axisX + axisY;
          sectionsForGo.push(canGo);
        }
      }
    }
  }
}
// логика двиения короля в лево вниз
function kingWalkingLeftDownLogic(axisY, axisX) {
  axisX--;
  axisY--;
  if (axisY <= 8) {
    if (axisY >= 1) {
      if (axisX <= 8) {
        if (axisX >= 1) {
          axisX = numToXaxis[axisX];
          canGo = axisX + axisY;
          sectionsForGo.push(canGo);
        }
      }
    }
  }
}
// логика двиения короля вверх
function kingWalkingUpLogic(axisY, axisX) {
  axisY++;
  if (axisY <= 8) {
    if (axisY >= 1) {
      if (axisX <= 8) {
        if (axisX >= 1) {
          axisX = numToXaxis[axisX];
          canGo = axisX + axisY;
          sectionsForGo.push(canGo);
        }
      }
    }
  }
}
// логика двиения короля вниз
function kingWalkingDownLogic(axisY, axisX) {
  axisY--;
  if (axisY <= 8) {
    if (axisY >= 1) {
      if (axisX <= 8) {
        if (axisX >= 1) {
          axisX = numToXaxis[axisX];
          canGo = axisX + axisY;
          sectionsForGo.push(canGo);
        }
      }
    }
  }
}
// логика двиения короля вправо
function kingWalkingRightLogic(axisY, axisX) {
  axisX++;
  if (axisY <= 8) {
    if (axisY >= 1) {
      if (axisX <= 8) {
        if (axisX >= 1) {
          axisX = numToXaxis[axisX];
          canGo = axisX + axisY;
          sectionsForGo.push(canGo);
        }
      }
    }
  }
}
// логика двиения короля влево
function kingWalkingLeftLogic(axisY, axisX) {
  axisX--;
  if (axisY <= 8) {
    if (axisY >= 1) {
      if (axisX <= 8) {
        if (axisX >= 1) {
          axisX = numToXaxis[axisX];
          canGo = axisX + axisY;
          sectionsForGo.push(canGo);
        }
      }
    }
  }
}

function addClassGoOrKill(chessCell) {
  sectionsForGo.forEach(function (CanGoIdCell) {
    const CanGoCell = document.getElementById(CanGoIdCell);
    if (chessCell.closest(".whiteFigure") && whiteCanWalk == true) {
      if (CanGoCell.closest(".whiteFigure")) {
      } else if (CanGoCell.closest(".blackFigure")) {
        CanGoCell.classList.add("canKill");
      } else {
        CanGoCell.classList.add("canWalk");
      }
    } else if (chessCell.closest(".blackFigure") && whiteCanWalk == false) {
      if (CanGoCell.closest(".blackFigure")) {
      } else if (CanGoCell.closest(".whiteFigure")) {
        CanGoCell.classList.add("canKill");
      } else {
        CanGoCell.classList.add("canWalk");
      }
    }
  });
}

// была ли рокировка?
var wasWhiteCastling = false;
var wasBlackCastling = false;

// айди ладьи для рокировки
var idWhiteRightCastleForCastling;
var idWhiteLeftCastleForCastling;
var idBlackRightCastleForCastling;
var idBlackLeftCastleForCastling;

// определяем возможна ли рокировка
function searchСastling(axisY, axisX, chessCell) {
  const rooksArrangementsId = [];
  if (chessCell.closest(".whiteFigure") && wasWhiteCastling == false) {
    const rooksArrangements = document.querySelectorAll(".castleWhite");
    rooksArrangements.forEach(function (rooksArrangement) {
      if (rooksArrangement.closest(".whiteFigure")) {
        rooksArrangementsId.push(rooksArrangement.id);
      }
    });
    rooksArrangementsId.forEach(function (idCellCheck) {
      const axisXCastleInStr = idCellCheck[0];
      const axisXCastle = xAxisToNum[axisXCastleInStr];
      const axisYCastle = Number(idCellCheck[1]);
      if (axisYCastle == axisY) {
        var xCoordinateForCheck = axisXCastle;
        var castlingRightCells = [];
        var castlingLeftCells = [];
        if (axisXCastle > axisX) {
          while (xCoordinateForCheck != axisX + 1) {
            xCoordinateForCheck--;
            xCoordinateForCheck = numToXaxis[xCoordinateForCheck];
            checkCell = xCoordinateForCheck + axisY;
            xCoordinateForCheck = xAxisToNum[xCoordinateForCheck];
            castlingRightCells.push(checkCell);
          }
          castlingRightCells.forEach(function (castlingRightCell) {
            console.log(castlingRightCell);
            if (
              document
                .getElementById(castlingRightCell)
                .closest(".blackFigure") ||
              document.getElementById(castlingRightCell).closest(".whiteFigure")
            ) {
              castlingRightCells.length = 0;
            }
          });
          if (castlingRightCells.length > 0) {
            cellForCastling = numToXaxis[axisX + 2] + axisY;
            document.getElementById(cellForCastling).classList.add("castling");
            document.getElementById(cellForCastling).classList.add("right");
            document
              .getElementById(cellForCastling)
              .classList.add("whiteCastling");
            idWhiteRightCastleForCastling = idCellCheck;
          }
        } else if (axisXCastle < axisX) {
          while (xCoordinateForCheck != axisX - 1) {
            xCoordinateForCheck++;
            xCoordinateForCheck = numToXaxis[xCoordinateForCheck];
            checkCell = xCoordinateForCheck + axisY;
            xCoordinateForCheck = xAxisToNum[xCoordinateForCheck];
            castlingLeftCells.push(checkCell);
          }
          castlingLeftCells.forEach(function (castlingLeftCell) {
            if (
              document
                .getElementById(castlingLeftCell)
                .closest(".blackFigure") ||
              document.getElementById(castlingLeftCell).closest(".whiteFigure")
            ) {
              castlingLeftCells.length = 0;
            }
          });
          if (castlingLeftCells.length > 0) {
            cellForCastling = numToXaxis[axisX - 2] + axisY;
            document.getElementById(cellForCastling).classList.add("castling");
            document.getElementById(cellForCastling).classList.add("left");
            document
              .getElementById(cellForCastling)
              .classList.add("whiteCastling");
            idWhiteLeftCastleForCastling = idCellCheck;
          }
        }
      }
    });
  } else if (chessCell.closest(".blackFigure") && wasBlackCastling == false) {
    const rooksArrangements = document.querySelectorAll(".castleBlack");
    rooksArrangements.forEach(function (rooksArrangement) {
      if (rooksArrangement.closest(".blackFigure")) {
        rooksArrangementsId.push(rooksArrangement.id);
      }
    });
    rooksArrangementsId.forEach(function (idCellCheck) {
      const axisXCastleInStr = idCellCheck[0];
      const axisXCastle = xAxisToNum[axisXCastleInStr];
      const axisYCastle = Number(idCellCheck[1]);
      if (axisYCastle == axisY) {
        var xCoordinateForCheck = axisXCastle;
        var castlingRightCells = [];
        var castlingLeftCells = [];
        if (axisXCastle > axisX) {
          while (xCoordinateForCheck != axisX + 1) {
            xCoordinateForCheck--;
            xCoordinateForCheck = numToXaxis[xCoordinateForCheck];
            checkCell = xCoordinateForCheck + axisY;
            xCoordinateForCheck = xAxisToNum[xCoordinateForCheck];
            castlingRightCells.push(checkCell);
          }
          castlingRightCells.forEach(function (castlingRightCell) {
            if (
              document
                .getElementById(castlingRightCell)
                .closest(".blackFigure") ||
              document.getElementById(castlingRightCell).closest(".whiteFigure")
            ) {
              castlingRightCells.length = 0;
            }
          });
          if (castlingRightCells.length > 0) {
            cellForCastling = numToXaxis[axisX + 2] + axisY;
            document.getElementById(cellForCastling).classList.add("castling");
            document.getElementById(cellForCastling).classList.add("right");
            document
              .getElementById(cellForCastling)
              .classList.add("blackCastling");
            idBlackRightCastleForCastling = idCellCheck;
          }
        } else if (axisXCastle < axisX) {
          while (xCoordinateForCheck != axisX - 1) {
            xCoordinateForCheck++;
            xCoordinateForCheck = numToXaxis[xCoordinateForCheck];
            checkCell = xCoordinateForCheck + axisY;
            xCoordinateForCheck = xAxisToNum[xCoordinateForCheck];
            castlingLeftCells.push(checkCell);
          }
          castlingLeftCells.forEach(function (castlingLeftCell) {
            if (
              document
                .getElementById(castlingLeftCell)
                .closest(".blackFigure") ||
              document.getElementById(castlingLeftCell).closest(".whiteFigure")
            ) {
              castlingLeftCells.length = 0;
            }
          });
          if (castlingLeftCells.length > 0) {
            cellForCastling = numToXaxis[axisX - 2] + axisY;
            document.getElementById(cellForCastling).classList.add("castling");
            document.getElementById(cellForCastling).classList.add("left");
            document
              .getElementById(cellForCastling)
              .classList.add("blackCastling");
            idBlackLeftCastleForCastling = idCellCheck;
          }
        }
      }
    });
  }
}

// логика двиения короля
function kingWalkingLogic(axisY, axisX, chessCell) {
  sectionsForGo = [];
  kingWalkingRightUpLogic(axisY, axisX);
  kingWalkingLeftUpLogic(axisY, axisX);
  kingWalkingRightDownLogic(axisY, axisX);
  kingWalkingLeftDownLogic(axisY, axisX);
  kingWalkingUpLogic(axisY, axisX);
  kingWalkingLeftLogic(axisY, axisX);
  kingWalkingDownLogic(axisY, axisX);
  kingWalkingRightLogic(axisY, axisX);
  addClassGoOrKill(chessCell);
  searchСastling(axisY, axisX, chessCell);
}

const chessTable = document.querySelector(".chessTable");
chessTable.addEventListener("click", function (event) {
  if (event.target.closest(".popupOpen")) {
    if (event.target.closest(".popupWhite")) {
      transformFrorWhitePawn(transformCellId, event);
    } else if (event.target.closest(".popupBlack")) {
      transformFrorBlackPawn(transformCellId, event);
    }
  } else if (event.target.closest(".canKill")) {
    kill(event);
  } else if (event.target.closest(".canWalk")) {
    walk(event);
  } else if (event.target.closest(".castling")) {
    castling(event);
  } else if (event.target.closest(".chessCell")) {
    removeClassesCanWalk();
    removeClassesCanKill();
    removeClassesCastling();
    const chessCell = event.target;
    addClassSelected(chessCell);
    const idCell = chessCell.id;
    const axisXInStr = idCell[0];
    const axisX = xAxisToNum[axisXInStr];
    const axisY = Number(idCell[1]);
    if (event.target.closest(".pawnWhite") && whiteCanWalk == true) {
      pawnWhiteWalkingLogic(axisY, axisX, chessCell);
    } else if (event.target.closest(".pawnBlack") && whiteCanWalk == false) {
      pawnBlackWalkingLogic(axisY, axisX, chessCell);
    } else if (
      event.target.closest(".castleWhite") ||
      event.target.closest(".castleBlack")
    ) {
      castleWalkingLogic(axisY, axisX, chessCell);
    } else if (
      event.target.closest(".knightWhite") ||
      event.target.closest(".knightBlack")
    ) {
      knightWalkingLogic(axisY, axisX, chessCell);
    } else if (
      event.target.closest(".bishopWhite") ||
      event.target.closest(".bishopBlack")
    ) {
      bishopWalkingLogic(axisY, axisX, chessCell);
    } else if (
      event.target.closest(".queenWhite") ||
      event.target.closest(".queenBlack")
    ) {
      queenWalkingLogic(axisY, axisX, chessCell);
    } else if (
      event.target.closest(".kingWhite") ||
      event.target.closest(".kingBlack")
    ) {
      kingWalkingLogic(axisY, axisX, chessCell);
    }
  }
});
