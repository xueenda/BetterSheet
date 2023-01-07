import * as monaco from 'monaco-editor'
// import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
// import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
// import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
// import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

self.MonacoEnvironment = {
  getWorker(_, label) {
    // if (label === 'json') {
    //   return new jsonWorker()
    // }
    // if (label === 'css' || label === 'scss' || label === 'less') {
    //   return new cssWorker()
    // }
    // if (label === 'html' || label === 'handlebars' || label === 'razor') {
    //   return new htmlWorker()
    // }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker()
    }
    // return new editorWorker()
  }
}

// Get the modal
var modal = document.getElementById("myModal");
// Get t./temp/demoan> element that closes the modal
var closeEditor = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
closeEditor.onclick = function () {
  modal.style.display = "none";
}

function embedJsEditor() {
  if (window.editor)
    return;

  window.editor = monaco.editor.create(document.getElementById('jscontainer'), {
    value: '// Implement your JavaScript code here',
    language: 'javascript',
    theme: 'vs-dark'
  });
}


$(function () {
  //配置项
  var options = {
    container: 'luckysheet', //luckysheet为容器id,
    title: 'BMO Test Sheet',
    // showtoolbar: false, // 是否显示工具栏
    showinfobar: false, // 是否显示顶部信息栏
    // showstatisticBar: false, // 是否显示底部计数栏
    // sheetBottomConfig: false, // sheet页下方的添加行按钮和回到顶部按钮配置
    // allowEdit: false, // 是否允许前台编辑
    // enableAddRow: false, // 是否允许增加行
    // enableAddCol: false, // 是否允许增加列
    // sheetFormulaBar: false, // 是否显示公式栏
    // enableAddBackTop: false, //返回头部按钮
    // showsheetbar: false, // 是否显示sheet
    // rowHeaderWidth: 0,
    // columnHeaderHeight: 0
    // data: demoSheet.sheets,
    forceCalculation: false,
    plugins: ['chart'],
    fontList: [
      {
        "fontName": "HanaleiFill",
        "url": "lib/assets/iconfont/HanaleiFill-Regular.ttf"
      },
      {
        "fontName": "Anton",
        "url": "lib/assets/iconfont/Anton-Regular.ttf"
      },
      {
        "fontName": "Pacifico",
        "url": "lib/assets/iconfont/Pacifico-Regular.ttf"
      }
    ],
    hook: {
      cellDragStop: function (cell, postion, sheetFile, ctx, event) {
        // console.info(cell, postion, sheetFile, ctx, event);
      },
      rowTitleCellRenderBefore: function (rowNum, postion, ctx) {
        // console.log(rowNum);
      },
      rowTitleCellRenderAfter: function (rowNum, postion, ctx) {
        // console.log(ctx);
      },
      columnTitleCellRenderBefore: function (columnAbc, postion, ctx) {
        // console.log(columnAbc);
      },
      columnTitleCellRenderAfter: function (columnAbc, postion, ctx) {
        // console.log(postion);
      },
      cellRenderBefore: function (cell, postion, sheetFile, ctx) {
        // console.log(cell,postion,sheetFile,ctx);
      },
      cellRenderAfter: function (cell, postion, sheetFile, ctx) {
        // console.log(postion);
      },
      cellMousedownBefore: function (cell, postion, sheetFile, ctx) {
        // console.log(postion);
      },
      cellMousedown: function (cell, postion, sheetFile, ctx) {
        // console.log(sheetFile);
      },
      sheetMousemove: function (cell, postion, sheetFile, moveState, ctx) {
        // console.log(cell,postion,sheetFile,moveState,ctx);
      },
      sheetMouseup: function (cell, postion, sheetFile, moveState, ctx) {
        // console.log(cell,postion,sheetFile,moveState,ctx);
      },
      cellAllRenderBefore: function (data, sheetFile, ctx) {
        // console.info(data,sheetFile,ctx)
      },
      updated: function (operate) {
        // console.info(operate)
      },
      cellUpdateBefore: function (r, c, value, isRefresh) {
        // console.info('cellUpdateBefore',r,c,value,isRefresh)
      },
      cellUpdated: function (r, c, oldValue, newValue, isRefresh) {
        // console.info('cellUpdated',r,c,oldValue, newValue, isRefresh)
      },
      sheetActivate: function (index, isPivotInitial, isNewSheet) {
        // console.info(index, isPivotInitial, isNewSheet)
      },
      rangeSelect: function (index, sheet) {
        // console.info(index, sheet)
      },
      commentInsertBefore: function (r, c) {
        // console.info(r, c)
      },
      commentInsertAfter: function (r, c, cell) {
        // console.info(r, c, cell)
      },
      commentDeleteBefore: function (r, c, cell) {
        // console.info(r, c, cell)
      },
      commentDeleteAfter: function (r, c, cell) {
        // console.info(r, c, cell)
      },
      commentUpdateBefore: function (r, c, value) {
        // console.info(r, c, value)
      },
      commentUpdateAfter: function (r, c, oldCell, newCell) {
        // console.info(r, c, oldCell, newCell)
      },
      cellEditBefore: function (range) {
        // console.info(range)
      },
      workbookCreateAfter: function (json) {
        // console.info(json)
      },
      rangePasteBefore: function (range, data) {
        // console.info('rangePasteBefore',range,data)
        // return false; //Can intercept paste
      }
    }
  }

  options.cellRightClickConfig = {
    customs: [{
      title: 'JavaScript Code Editor',
      onClick: function (clickEvent, event, params) {
        console.log('function test click', clickEvent, event, params)
        modal.style.display = "block";

        embedJsEditor();
      }
    }]
  }

  luckysheet.create(options);
  window.$s = luckysheet;
})

var isCtrl = false;
document.onkeyup = function (e) {
  if (e.key == 'Control') isCtrl = false;
}

document.onkeydown = function (e) {
  if (e.key == 'Control') isCtrl = true;
  if (e.key == 's' && isCtrl == true) {
    //run code for CTRL+S -- ie, save!
    // console.log('CTRL + S');
    var d = luckysheet.getAllSheets();
    // console.log(d)
    return false;
  }

  // Open JavaScript Editor
  if (e.key == 'e' && isCtrl == true) {
    modal.style.display = "block";
    embedJsEditor();
  }
}
