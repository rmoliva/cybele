

module.exports = (sb) ->
  'use strict'

  initialize = (options, done) ->
    console.log 'Loading Simplify'
    #scrollable sidebar
    $('.scrollable-sidebar').slimScroll
      height: '100%'
      size: '0px'
    #Collapsible Sidebar Menu
    $('.sidebar-menu .openable > a').click ->
      if !$('aside').hasClass('sidebar-mini') or Modernizr.mq('(max-width: 991px)')
        if $(this).parent().children('.submenu').is(':hidden')
          $(this).parent().siblings().removeClass('open').children('.submenu').slideUp 200
          $(this).parent().addClass('open').children('.submenu').slideDown 200
        else
          $(this).parent().removeClass('open').children('.submenu').slideUp 200
      false
    #Open active menu
    if !$('.sidebar-menu').hasClass('sidebar-mini') or Modernizr.mq('(max-width: 767px)')
      $('.openable.open').children('.submenu').slideDown 200
    #Toggle User container on sidebar menu
    $('#btn-collapse').click ->
      $('.sidebar-header').toggleClass 'active'
      return
    #theme setting
    $('#theme-setting-icon').click ->
      if $('#theme-setting').hasClass('open')
        $('#theme-setting').removeClass 'open'
        $('#theme-setting-icon').removeClass 'open'
      else
        $('#theme-setting').addClass 'open'
        $('#theme-setting-icon').addClass 'open'
      false
    $('#sidebarToggleLG').click ->
      if $('.wrapper').hasClass('display-right')
        $('.wrapper').removeClass 'display-right'
        $('.sidebar-right').removeClass 'active'
      else
        #$('.nav-header').toggleClass('hide');
        $('.top-nav').toggleClass 'sidebar-mini'
        $('aside').toggleClass 'sidebar-mini'
        $('footer').toggleClass 'sidebar-mini'
        $('.main-container').toggleClass 'sidebar-mini'
        $('.main-menu').find('.openable').removeClass 'open'
        $('.main-menu').find('.submenu').removeAttr 'style'
      return
    $('#sidebarToggleSM').click ->
      $('aside').toggleClass 'active'
      $('.wrapper').toggleClass 'display-left'
      return
    $('.sidebarRight-toggle').click ->
      $('.sidebar-right').toggleClass 'active'
      $('.wrapper').toggleClass 'display-right'
      $('footer').toggleClass 'display-right'
      false
    $('.dropdown-menu input').click (e) ->
      e.stopPropagation()
      #This will prevent the event from bubbling up and close the dropdown when you type/click on text boxes.
      return
    #to do list
    $('.task-finish').click ->
      if $(this).is(':checked')
        $(this).parent().parent().addClass 'selected'
      else
        $(this).parent().parent().removeClass 'selected'
      return
    #Delete to do list
    $('.task-del').click ->
      activeList = $(this).parent().parent()
      activeList.addClass 'removed'
      setTimeout (->
        activeList.remove()
        return
      ), 1000
      false
    $activeWidget = ''
    $activeWidgetHeader = undefined
    $headerHeight = undefined
    $screenHeight = undefined
    $widgetHeight = undefined
    $borderHeight = 3
    #Smart Widget
    # Refresh Widget
    $('.widget-refresh-option').click ->
      $activeWidget = $(this).parent().parent().parent()
      $activeSpinIcon = $activeWidget.find('.refresh-icon-animated').fadeIn()
      setTimeout (->
        $activeSpinIcon.fadeOut()
        return
      ), 2000
      false
    # Collasible Widget
    $('.widget-collapse-option').click ->
      $activeWidget = $(this).parent().parent().parent()
      $activeWidget.find('.smart-widget-inner').slideToggle()
      $activeWidget.toggleClass 'smart-widget-collapsed'
      $activeSpinIcon = $activeWidget.find('.refresh-icon-animated').fadeIn()
      setTimeout (->
        $activeSpinIcon.fadeOut()
        return
      ), 500
      $activeWidget = ''
      false
    #Changing Widget Color
    $('.widget-toggle-hidden-option').click ->
      $activeWidget = $(this).parent().parent().parent()
      $activeWidget.find('.smart-widget-hidden-section').slideToggle()
      $activeSpinIcon = $activeWidget.find('.refresh-icon-animated').fadeIn()
      setTimeout (->
        $activeSpinIcon.fadeOut()
        return
      ), 500
      $activeWidget = ''
      false
    #Changing Widget Header Background
    $('.widget-color-list li').click ->
      $activeWidget = $(this).parent().parent().parent().parent()
      `$selectedColor = $(this).data('color')`
      $activeWidget.removeClass 'widget-light-grey'
      $activeWidget.removeClass 'widget-dark'
      $activeWidget.removeClass 'widget-dark-blue'
      $activeWidget.removeClass 'widget-blue'
      $activeWidget.removeClass 'widget-green'
      $activeWidget.removeClass 'widget-yellow'
      $activeWidget.removeClass 'widget-orange'
      $activeWidget.removeClass 'widget-red'
      $activeWidget.removeClass 'widget-purple'
      if `$selectedColor != 'reset'`
        $activeWidget.addClass $selectedColor
      false
    # Remove Widget
    $('.widget-remove-option').click ->
      $activeWidget = $(this).parent().parent().parent()
      $('#deleteWidgetConfirm').popup 'show'
      false
    $('.remove-widget-btn').click ->
      $('#deleteWidgetConfirm').popup 'hide'
      $activeWidget.fadeOut()
      $activeWidget = ''
      false
    #Scroll to Top
    $('.scroll-to-top').click ->
      $('html, body').animate { scrollTop: 0 }, 600
      false
    # Popover
    $('[data-toggle=popover]').popover()
    # Tooltip
    $('[data-toggle=tooltip]').tooltip()
    $('[rel=tooltip]').tooltip()

    ###    $(window).load(function() {
          $('body').removeClass('overflow-hidden');
      
          //Enable animation
          $('.wrapper').removeClass('preload');
      
          //Chat Notification on top navigation
          setTimeout(function() {
            $('.chat-notification').find('.badge').addClass('active');
            $('.chat-alert').addClass('active');
          }, 3000);
      
          setTimeout(function() {
            $('.chat-alert').removeClass('active');
          }, 8000);
        });
    ###

    # Toggle Scroll to Top button
    $(window).scroll ->
      position = $(window).scrollTop()
      if position >= 200
        $('.scroll-to-top').addClass 'active'
      else
        $('.scroll-to-top').removeClass 'active'
      return
    done()
    return

  destroy = ->

  {
    init: initialize
    destroy: destroy
  }
