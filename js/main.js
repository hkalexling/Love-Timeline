jQuery(document).ready(function($){
	var timelineBlocks = $('.cd-timeline-block'),
		offset = 0.8;

	//hide timeline blocks which are outside the viewport
	hideBlocks(timelineBlocks, offset);

	var currentDate = new Date()
	var day = currentDate.getDate()
	var month = currentDate.getMonth() + 1
	var year = currentDate.getFullYear()
	var date_string = year + ' 年 ' + month + ' 月 ' + day + ' 日'
	day_count = dateDiffInDays(new Date("1/29/2016"), new Date());
	document.getElementById('days').innerHTML = date_string + '，' + "我们已经在一起 " + day_count + " 天了"

	//on scolling, show/animate timeline blocks when enter the viewport
	$(window).on('scroll', function(){
		(!window.requestAnimationFrame) 
			? setTimeout(function(){ showBlocks(timelineBlocks, offset); }, 100)
			: window.requestAnimationFrame(function(){ showBlocks(timelineBlocks, offset); });
	});

	function hideBlocks(blocks, offset) {
		blocks.each(function(){
			( $(this).offset().top > $(window).scrollTop()+$(window).height()*offset ) && $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
		});
	}

	function showBlocks(blocks, offset) {
		blocks.each(function(){
			( $(this).offset().top <= $(window).scrollTop()+$(window).height()*offset && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) && $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
		});
	}

	function dateDiffInDays(a, b) {
  		// Discard the time and time-zone information.
  		var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  		var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  		return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
	}

	function generateTimeLine() {
		$.getJSON('data.json', function(json){
			$.each(json.data, function(index, data) {

				if (!data.title || !data.text || !data.date){
					return;
				}

				var remainder = index % 3
				var circle = ''
				switch (remainder) {
					case 0:
						circle = '<div class="cd-timeline-img cd-green"></div>'
						break
					case 1:
						circle = '<div class="cd-timeline-img cd-red"></div>'
						break
					case 2:
						circle = '<div class="cd-timeline-img cd-yellow"></div>'
						break
					default:
						break
				}
				var img = ''
				if (data.img != null) {
					img = '<img src="img/' + data.img + '">'
				}

				var section = $('#cd-timeline')
				section.append('<div class="cd-timeline-block">' 
					+ circle 
					+ '<div class="cd-timeline-content">' 
					+ '<h2>' + data.title + '</h2>' 
					+ '<p>' + data.text + '</p>'
					+ img
					+ '<span class="cd-date">' + data.date + '</span>'
					+ '</div>' + '</div>')
			})	
		})
	}
	
	generateTimeLine()
});