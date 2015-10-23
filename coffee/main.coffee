input = null
output = null
indexes = null
keys = null
timer = null
count = 0

init = ->
	input = document.querySelector "input"
	input.addEventListener "keyup", keyPressed, false
	output = document.querySelector "#output"
	indexes = Object.keys words
	indexes.sort -> Math.random() - 0.5
	timer = new Date().getTime()
	count = 0
	next()
	return

next = ->
	input.value = ""
	word = indexes.pop();
	if not word?
		finish()
		return
	ruby = words[word];
	keys = getRomanKeys ruby
	keys_text = (value[0] for value in keys).join("")
	output.innerHTML = "#{word}<br>#{ruby}<br>#{keys_text}<br>"
	return

finish = ->
	timer = new Date().getTime() - timer
	output.innerHTML = "#{count}chars / #{timer / 1000}s = #{count / (timer / 1000)}chars/s<br>"

keyPressed = (event) ->
	types = event.target.value
	types = getTypedKeys types
	console.log "#{keys.join " | "} == #{types.join " | "}"
	iscorrect = keys.every (value, index) -> value.indexOf(types[index]) isnt -1
	if iscorrect
		count += types.length
		next()

getRomanKeys = (word) ->
	list = []
	for _, index in word
		for char_length in [2..1]
			char = word.substring index, index + char_length
			map = keymap[char]
#			console.log "#{char} , #{map}"
			if map?
				map = map.slice 0
				if isxtu
					xtu = list.pop()
					xtu = (fix.charAt 0 for fix in map).concat xtu
					list.push xtu
				list.push map
				switch char_length
					when 2 then _i++
					when 1 then isxtu = char is "っ"
				break
#		console.log "  --> #{list.join " | "}"
	list

getTypedKeys = (roman) ->
	list = []
	for _, index in roman
		for char_length in [3..1]
			char = roman.substring index, index + char_length
#			console.log "#{char}"
			if char.match /^[kstnhmyrwygzdbplxcqfjv]*[aiueo]$/
				if not isxtu = char.charAt(0) is char.charAt(1)
					list.push char
					switch char_length
						when 3 then _i+=2
						when 2 then _i++
					break
			if char.match /^(-|n|nn)$/
				list.push char
				switch char_length
					when 2 then _i++
				break;
			if char_length is 1 and isxtu
				list.push char
#		console.log "  --> #{list.join " | "}"
	list

window.addEventListener "load", init, false
window.getTypedKeys = getTypedKeys