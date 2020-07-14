# Web rendering experiment
This experiment should show differences in rendering speed between HTML, SVG, Canvas2d and WebGL

[Demo](https://ilopx.github.io/experiment-web-renders-html-svg-canvas2d-webGL/ "Demo")

![](https://raw.githubusercontent.com/ilopX/experiment-web-renders-html-svg-canvas2d-webGL/master/preview.gif)

## Class Model
![class model](https://raw.githubusercontent.com/ilopX/experiment-web-renders-html-svg-canvas2d-webGL/master/classModel.png)

## TODO:
- [ ] WebGL render
- [x] Fix play/pause - zero frame rate multiplier
- [ ] Finish **TextAnimation** class
- [ ] **Visual Debugger** for drawing animation information:
	1. - [ ] Design a visual debugger interface 
	2. - [ ] Implementation VisualDebugger interface in
		- [ ] SnowDebuger
		- [ ] RandomDebuger
		- [ ] BounceDebuger
		- [ ] TextDebuger
	3. - [ ] Add custom ui values for \*Debugger classes
- [x] class **App** (main.js) which will initialize ui & controller
- [ ] Kernel design:
	1. - [x] Ren lib -> **core**
	2. - [x] Relocation: 
				AnimationInterface -> Animation.js,
				RenderInterface -> Renders.js
				Animation.js, Renders.js -> core
	3. - [ ] Initialization renders and animations from **config.js:**
		
		```animations: ['Bounce', 'Snow', 'Random', 'Text']```
		
		```renders: ['HTML', 'Canvas2d', 'SVG']```
- [ ] New feature in **ObjectData**:
	- [ ] Rename to a more suitable name 
	- [ ] The ability to create objects in the different visual path
        - [ ] Rand
		- [ ] Spiral
		- [ ] Grid
	- [ ] Implementation new features in ui
- [ ] Update class diagram
- [x] Stylize ui


