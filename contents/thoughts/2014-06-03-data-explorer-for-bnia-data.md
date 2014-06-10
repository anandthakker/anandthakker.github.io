---
title: "Simple data explorer for Baltimore neighborhood data."
date: 2014-06-03
template: article.jade
filename: /:year/:month/:day/:title/index.html
tags:
  - project
  - AngularJS
  - d3js

type: regular
---

In response to a local challenge for this year's [National Day of Civic Hacking][1],
designer [Bryan Connor][2] and I built a simple app for exploring a set of data about
Baltimore neighborhoods.  The data, curated/collected by [BNIA][3], includes
dozens of different indicators about 55 "Community Statistical Areas" in Baltimore.

[![Screenshot of Data Explorer App](/images/baltimoredataexplorer.jpg)][4]

The idea here is to make a way to explore indicators and neighborhoods
of interest.  Currently, you can choose your indicators from the menu on the
right, and you'll get a [choropleth][6] map and a histogram for each one, presented
as ["small multiples"][7].  You can also highlight specific neighborhoods and
rearrange the maps.

A work in progress, for sure, but here's [the current live version][4] and [the github repo][5].

[1]: http://hackforchange.org/
[2]: http://twitter.com/bryanconnor
[3]: http://bniajfi.org/
[4]: http://anandthakker.github.io/baltimore-neighborhood-vitalsigns/#/i/salepr12:read812:pwhite10:mort44_12/c/North-_Baltimore--Guilford--Homeland:Upton--Druid-_Heights:The-_Waverlies/
[5]: http://github.com/anandthakker/baltimore-neighborhood-vitalsigns
[6]: http://en.wikipedia.org/wiki/Choropleth_map
[7]: http://en.wikipedia.org/wiki/Small_multiple
