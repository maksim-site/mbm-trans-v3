$(function(){

	$('.next_b').each( function(i){
	
		$(this).attr('idx', i );
	
	});

	$('.next_b').on('click', function(){
	
		var i = parseInt( $(this).attr('idx') ) + 1;
		
		var next = $('.next_b[idx='+i+']');
		
		if ( next.size() == 0 ){
			next = $('.footer');
		}
		
		$('html,body').animate({scrollTop: next.offset().top }, 700);
	
	});
	
	$('.up_b').on('click', function(){
		$('html,body').animate({scrollTop: 0 }, 700);
	});
	
	$('.fancy').fancybox();
	
	//отправка форм
	
	$(document).on('click', '.go', function(e){
		
		e.stopPropagation();
		e.preventDefault();
		
		var $form = $(this).closest('.form');
		
		var data = Object();
		var rules = Object();
		
		var inputs = $form.find('input').add('textarea', $form.get(0));
		
		var validate = true;
		
		inputs.each(function(){
		
			var r = $(this).data('rules');
			
			if (r && r.length != 0){
			
				rules[$(this).attr('name')] = r;
			
				r = r.split(',');
				
				for (i = 0; i < r.length; i++)
				{
					var rule = r[i];
					if (validator[rule]){
						if ( !validator[rule]($(this)) ){
							validate = false;
						}
					}
				}
			}
		
			data[$(this).attr('name')] = $(this).val();
		});
		
		if (!validate) return;
	
		var btn = $(this).addClass('btn-desabled').removeClass('go');
		
		$.ajax({
			url: cp_page,
			data: {feilds: data, rules: rules},
			type:'post',
			dataType: 'JSON',
			success:function(data){
				if (data.success == 1){
					
					$.fancybox({
						href: successPage,
						type: 'ajax'
					});
					
					$('input[type=text]').add('textarea')
						.val('');
						
				}
				else{
					alert( data.error );
				}
				btn.addClass('go').removeClass('btn-desabled');
			}
		});
		
		return false;
	});
	
	$('input').add('textarea').on('focus', function(){
		$(this).parent()
			.removeClass('wrong');
	}).each( function(){
	
		//inputPlaceholder( this );
		
		if ( $(this).data('rules') ){
			$(this).wrap('<div class="feild_wrapper"></div>');
			$(this).parent().append('<span class="error_label"></span>');
		}
		
	});
	

});

/* validator */

var validator = {
	required:function($i){
		if ($i.val() == '' || $i.val() == $i.attr('placeholder')){
			fieldError.call( $i, lang.requiredError );
			return false;
		}
		return true;
	},
	email:function($i){
	
		if ($i.val() == '') return true;
		
		var r = new RegExp(".+@.+\..+","i");
		if ( ! r.test($i.val()) ){
				fieldError.call( $i, lang.emailError );
				return false;
			}
		return true;
	},
	phone:function($i){
		console.log('phone');
		var r = new RegExp("^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$","i");
		if ( ! r.test($i.val()) ){
				fieldError.call( $i, lang.phoneError );
				return false;
			}
		return true;
	}
}

var fieldError = function(message){

	if ( !$(this).parent().hasClass('feild_wrapper') ){
	
		$(this).wrap('<div class="feild_wrapper"></div>');
		$(this).parent().append('<span class="error_label"></span>');
	
	}
	
	$(this).parent().addClass('wrong');
	$(this).siblings('.error_label').text( message );
	
	return false;
}