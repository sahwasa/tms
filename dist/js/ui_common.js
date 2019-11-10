(function init($){
  // navigator

  /* layer_popup */
  var modal= $( "[dataformat='modal']" );
  // modal.draggable({
  //   handle: ".pop_tit",
  //   containment: "body",
  //   scroll : true
  //  });
  modal.find("[role='btn_close']").on('click',function(e){
    e.preventDefault();
    $(this).parents('.overlay').hide();
  });
  var rolePopOpen =$("[role]");
  rolePopOpen.on('click',function(){
    var popOverlay = $('#'+$(this).attr('role')),
        objHtml = $('html');
    (popOverlay.css('display') == 'none') ? objHtml.css('overflow','hidden')
    : objHtml.css('overflow','auto');
  })

  /* fileDeco */
  $('[role="fileAdd"]').change(function(){
    var fileAdd = $(this);
    fileAdd.parent('span').prev('[role="filePath"]').val(fileAdd.val());
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
  

  $('.ui_checkbox input').checkboxradio({ icon: false ,direction: "vertical"});

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
  $('.btn_toggle').on('click',function(e){
    e.preventDefault();
    var cur = $(this).attr('datavalue');
    if($(this).attr('disabled') == 'disabled') return false;
    if(cur == 'on'){
      $(this).attr('datavalue','off');
    }else{
      $(this).attr('datavalue','on');
    }
  })
})(jQuery);
