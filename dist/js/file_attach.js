var fIndex = 0;
var totalfSize = 0;
var fList = new Array([]);
var fSizeList = new Array([]);
var uploadSize = 10 * 1024 * 1024; //MB
var maxUploadSize = 200 * 1024 * 1024; //MB

function fileDropEvt(){
  var file_drop = $('#file-drop');
  $('#attachFiles').on('change',function(e){
    var files = e.target.files;
    selectFile(files);
  });
  file_drop.on("dragover",function drop(e){
    e.stopPropagation();
    e.preventDefault();
  });
  file_drop.on("drop",function(e){
    e.stopPropagation();
    e.preventDefault();
    var files = e.originalEvent.dataTransfer.files; //filelist obj.
    if(files != null){
      if(files.length < 1){
          alert("폴더 업로드 불가"); //ie
          return;
      }else{
        for(var i = 0; i < files.length; i++){
          var fType = files[i].type;
          if(fType == ""){
            alert("폴더 업로드 불가"); //chrome
            return;
          }
        }
      }
      selectFile(files);
    }else{
        alert("ERROR");
    }
  });
}

function selectFile(fileObject){
  var files = null;

  if(fileObject != null){
    files = fileObject;
  }else{
    files = $('#multipaartFileList_' + fIndex)[0].files; //직접등록
  }
  if (files != null){
    for(var i = 0; i <files.length; i++){
      var fName = files[i].name; //파일명
      var fNameArr = fName.split("\."); //경로
      var fExt = fNameArr[fNameArr.length - 1]; //확장자
      var fSize = files[i].size / 1024; //사이즈

      if($.inArray(fExt, ['exe', 'bat', 'sh', 'java', 'jsp', 'html', 'js', 'css', 'xml']) >= 0){
        // 확장자 체크
        alert("등록 불가 확장자");
        break;
      }else if(fSize > uploadSize){
        // 파일 사이즈 체크
        alert("용량 초과\n업로드 가능 용량 : " + uploadSize + " KB");
        break;
      }else{
        totalfSize += fSize;// 전체 파일 사이즈
        fList[fIndex] = files[i];// 파일 배열에 넣기
        fSizeList[fIndex] = fSize;// 파일 사이즈 배열에 넣기
        addFileList(fIndex, fName, fSize, fExt);// 업로드 파일 목록 생성
        fIndex++;// 파일 번호 증가
      }
    }
  }else{
    alert("ERROR");
  }
}
function addFileList(fIndex, fName, fSize, fExt){
  var viewList = $('#fileList');
  var html = "";
  var fUnit = "KB";
  if(fSize > 1024){
    fSize = fSize / 1024;
    fUnit = "MB";
  }
  fSize = Math.floor(fSize*100)/100;

  html += "<li id='fileTr_" + fIndex + "'>";
  html += fName + "<span class='file_size'>" + fSize + fUnit + "</span>";
  html += "<a href='#' onclick='deleteFile(" + fIndex + "); return false;' class='axi_only axi_del' title='삭제'>삭제</a>";
  // html += "<i class='ico_ext ext_" + fExt + "'></i>";  
  html += "</li>";
  viewList.append(html);
  // infoView();
}
function deleteFile(fIndex){
  totalfSize -= fSizeList[fIndex];// 전체 파일 사이즈 수정
  delete fList[fIndex];// 파일 배열에서 삭제
  delete fSizeList[fIndex];// 파일 사이즈 배열 삭제
  $("#fileTr_" + fIndex).remove();// 업로드 파일 테이블 목록에서 삭제
  // infoView();
}
function infoView(){
  var fileList = $('#fileList li').length;
  var info = $('.drop_info');
  if(fileList == 0){
    info.show();
  }else{
    info.hide();
  }
}
