(function init($){
  // navigator
  var nav = $('.nav > li > a')

  nav.on('click',function(e){
    if($(this).parent('li').find('ul').hasClass('sub')) e.preventDefault();
    $('.nav > li').removeClass('on');
    $(this).parent('li').addClass('on');
  })

  /* layer_popup */
  var modal= $( "[dataformat='modal']" ),
      memo= $( "[dataformat='memo']" );
  modal.draggable({
    handle: ".pop_tit",
    cursor: "move",
    containment: "parent",
    scroll:false
   });
  modal.find("[role='btn_close']").on('click',function(e){
    e.preventDefault();
    $(this).parents('.overlay').hide();
    $('html').css('overflow','auto');
  });
  memo.find("[role='btn_close']").on('click',function(e){
    e.preventDefault();
    $(this).parents('.pop_wrap').hide();
  });

  var roleMemoOpen = $("[openMemo]");
  roleMemoOpen.on('click',function(e){
    e.preventDefault();
    var thisP = $(this).parent('td'),
        thisMemo = $('#'+$(this).attr('openMemo'));
    thisP.css('position','relative');
    thisMemo.show();
  });

  var rolePopOpen =$("[openpop]");
    rolePopOpen.on('click',function(){
    var popOverlay = $('#'+$(this).attr('openpop')),
        objHtml = $('html');  
    if(popOverlay.css('display') == 'none'){
      objHtml.css('overflow','hidden');
      popOverlay.show();
    }else{
      objHtml.css('overflow','auto');
    }
  });

  /* fileDeco */
  var filePath = $('[role="filePath"]');
  filePath.val('선택된 파일이 없음');
  $('[role="fileAdd"]').change(function(){
    var fileAdd = $(this);
    fileAdd.parent('.file_attach').next('[role="filePath"]').val(fileAdd.val());
  });

  // accordion
  $('[role="acc"]').accordion({
    header : "h2",
    collapsible: true,
    heightStyle: "content",
    icons: {
      "header": "ui-icon-plus",
      "activeHeader": "ui-icon-minus"
    }
  });
  
  /*calendar*/
  $.datepicker.setDefaults({
    buttonImageOnly: true,
    showOn: "both",
    buttonImage: "../img/btn_calendar.png",
    changeMonth: true,
    changeYear: true,
    numberOfMonths: 1,
    regional : ["ko"],
    dateFormat : "yy-mm-dd"
  });
  $( "[dataformat='datepic']" ).datepicker({
      buttonText: "날짜를 선택해주세요."
  });

  
   var from = $( "[dataformat='from']" ).datepicker({
    buttonText: "시작날짜를 선택해주세요.",
    onClose: function( selectedDate ) {
      var getName=$(this).attr('name');
      $("input[name='"+ getName +"'].to").datepicker( "option", "minDate", selectedDate );
    }  
  });
  var to = $( "[dataformat='to']" ).datepicker({
    buttonText: "종료날짜를 선택해주세요.",
    onClose: function( selectedDate ) {
      var getName=$(this).attr('name');
      $("input[name='"+ getName +"'].from").datepicker( "option", "maxDate", selectedDate );
    }
  }); 

  $("[dataformat='monthpic']").monthpicker({
    changeYear:true,    
    yearRange: 'c-100:c+10',
    buttonImageOnly: true,
    showOn: "both",
    buttonImage: "../img/btn_calendar.png",
    regional : ["ko"],
    stepYears: 1,
    dateFormat : "yy-mm",
    buttonText: "연월을 선택해주세요.",
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    yearSuffix: '년'
   });

  $('.ui_checkbox input').checkboxradio({ icon: false ,direction: "vertical"});

  // 기간선택
  var typeP = $('[typePeriod]'),
      typePBtn = $('[name="dType"]');
  typePBtn.each(function(){
  if($(this).prop('checked')) changePeriod($(this).attr('id'));
  });
  typePBtn.on('change',function(){
  var getType = $(this).attr('id');
  changePeriod(getType);
  })
  function changePeriod(getType){
  typeP.hide();
  $('[typePeriod="'+ getType +'"]').show();
  }

  //tab
  var tab_cont = $('.tab_conts .tab_cont'),
      tab_btn = $('.tab_list li');
  tab_cont.hide();
  tab_cont.first().show();
  tab_btn.first().addClass('on');

  $('.tab_list').on('click','a', function(e){
    e.preventDefault();
    var getId = $(this).prop('href').split('#')[1];
    tab_cont.hide();
    tab_btn.removeClass('on');
    $(this).parent('li').addClass('on');
    $('#'+getId).show();
    doubleScrollInit();
  });  

  // slectlist evt
  var selList = $('[role="checklist"]'),
      selBtn = selList.find('input'),
      allBtn = $('[role="all"]');    
  selBtn.each(function(){
    if($(this).prop('checked')) $(this).parent('label').addClass('on');
  });
  selBtn.on('change', function(){
    var sel = $(this),
        selP = sel.parents('[role="checklist"]');
      addOn(sel);
      allEvt(selP);
  });
  allBtn.on('change',function(){
    var all = $(this);
    addOn(all);
  })

  function addOn(sel){
    if(sel[0].type === 'radio'){
      sel.parents('.select_list').find('label').removeClass('on');
    }
    (sel.prop('checked')) ?
      sel.parents('label').addClass('on') :
      sel.parents('label').removeClass('on');
  }
  function allEvt(selP){
    var checkLeng = selP.find(':checkbox:checked').length,
        allLeng = selP.find(':checkbox').length,
        thisAll = selP.prev('label').find('[role="all"]');

    if(selP.parent('dl').length > 0){
      thisAll = selP.parents('dl').find('[role="all"]');      
      (checkLeng) ?
      thisAll.prop('checked',true).parents('label').addClass('on'):
      thisAll.prop('checked',false).parents('label').removeClass('on');
    }else{
      (checkLeng === allLeng) ?
      thisAll.prop('checked',true).parents('label').addClass('on') :
      thisAll.prop('checked',false).parents('label').removeClass('on');
    }
  }
  allBtn.on('change',function(){
    var sel = $(this),
        selUl = $(this).parent('label').next('ul'),
        selDl = $(this).parents('dt').next('dd');

    if(sel.prop('checked')){
      selUl.find(':checkbox').prop('checked',true);
      selDl.find(':checkbox').prop('checked',true);
      selUl.find('label').addClass('on');
      selDl.find('label').addClass('on');
    }else{
      selUl.find(':checkbox').prop('checked',false);
      selDl.find(':checkbox').prop('checked',false);
      selUl.find('label').removeClass('on');
      selDl.find('label').removeClass('on');
    }
  });
  var customSelect = $(".custom_select select");    
  customSelect.on({
    change : function(){
      var select_name = $(this).children("option:selected").text();
      $(this).siblings("label").text(select_name);
    }
  })
  $('[role="toggleEvtWrap"]').on('click', '[role="toggle"]',function(e){
    e.preventDefault();
    var cur = $(this).attr('datavalue');
    if($(this).attr('disabled') == 'disabled') return false;
    if(cur == 'on'){
      $(this).attr('datavalue','off');
    }else{
      $(this).attr('datavalue','on');
    }
  })

  // doblescroll
  var wrapper1 =  $('.wrapper1'),
      wrapper2 =  $('.wrapper2');
  function doubleScrollInit(){
    var wrapperW;
    wrapper2.each(function(){
      wrapperW = $(this).find('table').outerWidth();
      $(this).siblings('.wrapper1').find('div').css('width',wrapperW);
    });
  }
  wrapper1.scroll(function(){
    var scrollL = $(this).scrollLeft(),  
        connectWrap = $(this).siblings('.wrapper2');
    connectWrap.scrollLeft(scrollL);
  });
  wrapper2.scroll(function(){
    var scrollL = $(this).scrollLeft(),  
    connectWrap = $(this).siblings('.wrapper1');
    connectWrap.scrollLeft(scrollL);
  });
  doubleScrollInit();
 
})(jQuery);
