(function(){var pageFix = $("#keyboard").attr("src").split('/');pageFix.pop();var urlPage = pageFix.join('/');urlPage = urlPage==''?'':urlPage+'/';document.write("<script language=javascript src='"+urlPage+"core/simplified/CN.js'></script>");document.write("<script language=javascript src='"+urlPage+"keyboard.js'></script>");})();