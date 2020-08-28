
$(document).ready(function() {
    $('#time').datetimepicker({
        format: 'LT',
        //format: 'HH:mm:ss',
        collapse:false,
        sideBySide:true,
        useCurrent:false
    });

});

$(function(){

    function modal(data) {

        $('.modal-title').html(data.title);
        $('.modal-footer button:not(".btn-default")').remove();
        $('#title').val(data.event ? data.event.title : '');

        if(!data.event) {
            var now = new Date();
            var time = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes());
        } else {
            var time = data.event.date.split(' ')[1].slice(0, -3);
            time = time.charAt(0) === '0' ? time.slice(1) : time;
        }
        $('#time').val(time);
        $('#description').val(data.event ? data.event.description : '');
        $('#color').val(data.event ? data.event.color : '#3a87ad'); //default color

        $.each(data.buttons, function(index, button){
            $('.modal-footer').prepend('<button type="button" id="' + button.id  + '" class="btn ' + button.css + '">' + button.label + '</button>')
        });

        $('.modal').modal('show');
    }

    var currentDate; 
    var currentEvent;

    $('#color').colorpicker(); 
    $('#time').timepicker({
        minuteStep: 5,
        showInputs: false,
        disableFocus: true,
        showMeridian: false
    });

    $('#calendar').fullCalendar({
        timeFormat: 'H(:mm)',
        header: {
            left: 'prev, next, today',
            center: 'title',
            right: 'month, basicWeek, basicDay'
        },
     
        events: 'crud/getEvents.php',

        dayClick: function(date, event, view) {
            currentDate = date.format();
            modal({

                buttons: {
                    add: {
                        id: 'add-event',
                        css: 'btn-success',
                        label: 'Add'
                    }
                },
                title: 'Add Event (' + date.format() + ')'
            });
        },

        eventMouseover: function(calEvent, jsEvent, view){
            var tooltip = '<div class="event-tooltip">' + calEvent.description + '</div>';
            $("body").append(tooltip);
            $(this).mouseover(function(e) {
                $(this).css('z-index', 10000);
                $('.event-tooltip').fadeIn('500');
                $('.event-tooltip').fadeTo('10', 1.9);
            }).mousemove(function(e) {
                    $('.event-tooltip').css('top', e.pageY + 10);
                    $('.event-tooltip').css('left', e.pageX + 20);
                });
        },
        eventMouseout: function(calEvent, jsEvent) {
            $(this).css('z-index', 8);
            $('.event-tooltip').remove();
        },

        eventClick: function(calEvent, jsEvent, view) {
            currentEvent = calEvent;
            modal({
                buttons: {
                    delete: {
                        id: 'delete-event',
                        css: 'btn-danger',
                        label: 'Delete'
                    },
                    update: {
                        id: 'update-event',
                        css: 'btn-success',
                        label: 'Update'
                    }
                },
                title: 'Edit Event "' + calEvent.title + '"',
                event: calEvent
            });
        }
    });

    $('.modal').on('click', '#add-event',  function(e){
        if(validator(['title', 'description'])) {
            $.post('crud/addEvent.php', {
                title: $('#title').val(),
                description: $('#description').val(),
                color: $('#color').val(),
                date: currentDate + ' ' + getTime()
            }, function(result){
                $('.modal').modal('hide');
                $('#calendar').fullCalendar("refetchEvents");
            });
        }
    });

    $('.modal').on('click', '#update-event',  function(e){
        if(validator(['title', 'description'])) {

            $.post('crud/updateEvent.php', {
                id: currentEvent._id,
                title: $('#title').val(),
                description: $('#description').val(),
                color: $('#color').val(),
                date: currentEvent.date.split(' ')[0]  + ' ' +  getTime()
            }, function(result){
                $('.modal').modal('hide');
                $('#calendar').fullCalendar("refetchEvents");
            });

        }
    });

    $('.modal').on('click', '#delete-event',  function(e){
        if(confirm("Are you sure you want to delete this event?")) {
            $.get('crud/deleteEvent.php?id=' + currentEvent._id, function(result){
                $('.modal').modal('hide');
                $('#calendar').fullCalendar("refetchEvents");
            });
            } else {
                return false;
            }
    });

    function getTime() {
        var time = $('#time').val();
        return (time.indexOf(':') == 1 ? '0' + time : time) + ':00';
    }

    function validator(elements) {
        var errors = 0;
        $.each(elements, function(index, element){
            if($.trim($('#' + element).val()) == '') errors++;
        });
        if(errors) {
            $('.error').html('Please insert title and description');
            return false;
        }
        return true;
    }
});