$(document).ready(function () {
    $('.sidebar-menu li a.toggle').on('click', function () {
        if ($(this).parent("li").hasClass('active')) {
            $(this).parent("li").removeClass('active');
            $(this).next('.treeview-menu').slideUp();
        } else {
            $(".sidebar-menu li").removeClass("active").find(".treeview-menu").slideUp();
            $(this).parent("li").addClass('active');
            $(this).next('.treeview-menu').slideDown();
        }
    });
    
    $('.rightsidebar .sidebar-header').on('click', '.toggle-right', function(){
        $('.rightsidebar').toggleClass('rightsidebar-open');
    });
    
    
    $('.deep-rule-sidebar .toolbar-icons').on('mouseover', function(){
        $(this).children('.rule-list-wrapper').toggleClass('rule-list-wrapper-open');
    });
    $('.deep-rule-sidebar .toolbar-icons').on('mouseout', function(){
        $(this).children('.rule-list-wrapper').toggleClass('rule-list-wrapper-open');
    });
});