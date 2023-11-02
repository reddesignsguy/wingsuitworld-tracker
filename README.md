# wingsuitworld-tracker

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

The font-size and positioning had to be adjusted responsively. The responsiveness for the two texts were originally done separately, which added unnecessary complexity. The solution was to use a grid that would essentially bind the two texts together (to the best that grid can), and so I wouldn't have to worry about making sure that the texts were close to each other as the screen got smaller. There were a few nuances like adjusting the responsiveness of the line-height, but other than that, the intro section is now responsive.

-  Responsive grid for maps without using media queries -> the columns are calculated using repeat(auto-fit, minmax(200px, (some_value)vh)
