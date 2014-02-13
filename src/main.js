require([
	'lisp/parser', 'lisp/renderer'
], function(
	parser, renderer
) {
	$(document).ready(function() {
		var $article = $('<article>');
		var $title = $('<div class="panel-title">')
			.append($('<div class="date">二零一四年 二月 九日</div>'))
			.append($('<div class="sentence title">我 最 喜欢的 爱好 是 <i title="Diànnǎo biānchéng (computer programming)">电脑编程</i> 和 <i title="Yǔyán (language)">语言</i> 学习.</div>'))
			.appendTo($article);
		
			$article.append($('<div class="panel-body">')
				.append($('<div class="sentence">')
					.html('我 <i title="xiāngxìn (am certain)">相信</i> 我 可以 <i title="lìyòng (utilize)">利用</i> 我的 <i title="ruǎnjiàn gōngchéng (software engineering)">软件工程</i> <i title="jiànshì (experience)">见识</i> 来 <i title="Tígāo (improve)">提高</i> 我的 语言 学习.'))
				.append($('<div class="sentence">')
					.html('一直以来 我用 <i title="pīnyīn">拼音</i> 和 <i title="yuè pīn">粤拼</i> 来 学习 <i title="fāyīn (pronunciation)">发音</i>, 但 我 喜欢 <i title="zhùyīn (bopomofo)">注音</i> 越来越 多.'))
				.append($('<div class="sentence">')
					.html('我 <i title="Fāxiàn (realized)">发现</i> <i title="Yuánlái">原来</i> <i title="Dāng (when)">当</i> 我用 拼音，我 还是 <i title="Chángcháng (often)">常常</i> <i title="Yīlài(rely)">依赖</i> <i title="yú (on)">于</i> 英文 <i title="Zìmǔ (alphabet)">字母</i>.'))
				.append($('<div class="sentence">')
					.html('但是，当 我 <i title="dú (read)">读</i> 注音，我是 没有 那么 <i title="hàipà (afraid of)">害怕</i> 中国文字.'))
				.append($('<div class="sentence">')
					.html('这是 因为 注音 和 汉字 看起来 <i title="xiāngsì (similar)">相似</i>.'))
			);
		var src = parse('(grid (rows (boxes (split 3)).lazy []#triplets))');
		var $panel = $('<div class="panel-body">');
		var $row = $('<div class="row">').appendTo($panel);
		var $panel2 = $('<div class="panel-body">');
		render$(src).appendTo($('<div><h6>Template</h6></div>').appendTo($row))
		var triplets = parse($.trim($('#bpmf').text()));
		query(src, '(id triplets)').replaceWith(triplets)
		render$(triplets).appendTo($('<div><h6>Data</h6></div>').appendTo($row))
		render$(src).appendTo($('<div><h6>Template + Data</h6></div>').appendTo($panel2))
		$panel.appendTo($article)
		$panel2.appendTo($article)
		$('body').prepend($article);
	});
});

