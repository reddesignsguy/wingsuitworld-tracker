
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
[![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)
	![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
 	![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
  ![Lua](https://img.shields.io/badge/lua-%232C2D72.svg?style=for-the-badge&logo=lua&logoColor=white)
  ![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
# wingsuitworld-tracker

System Design

<img width="919" alt="image" src="https://github.com/reddesignsguy/wingsuitworld-tracker/assets/49921782/6f2d50d7-8df9-438e-bb3c-8c38180049be">

- mobile first
- useReact
- useState
- variable scoping

8/30 

- player-page__flexbox:
Switched from flexbox to grid solution
- grid controls width of children regardless of size of the content

SVG pain
- had 3 layers, wanted them to overlap
- tried doing it thru code, was messy bc. required position:absolute, which is hard to manage in a responsive app
- decided to combine all the layers into 1 svg using InkScape, surprisingly, really hard to find a site that effortlessly does this
- tried using the 1 svg file, but react did not not support it cuz it has "namespace" or something to do with not being able to interpret xmlns, but using https://jakearchibald.github.io/svgomg/, we're able to remove those tags and react is able to interpret it

9/2 
- Faced multiple problems with NAME and RANK texts

The font-size and positioning had to be adjusted responsively. The responsiveness for the two texts was originally handled separately, which added unnecessary complexity. The solution was to use a grid that would essentially bind the two texts together (to the best that grid can). With this, I essentially could focus on handling the responsiveness for one class, i.e: the grid, PLUS I wouldn't have to worry about making sure that the texts were close to each other as the screen got smaller. There were a few nuances like adjusting the responsiveness of the line height, but other than that, the intro section is now responsive.

The results:
[![test](https://gyazo.com/862f3b793a8a2864ce2dad0bcb47298d.gif)](https://gyazo.com/862f3b793a8a2864ce2dad0bcb47298d) 
https://gyazo.com/862f3b793a8a2864ce2dad0bcb47298d

-  Responsive grid for maps without using media queries -> the columns are calculated using repeat(auto-fit, minmax(200px, (some_value)vh)
