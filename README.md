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