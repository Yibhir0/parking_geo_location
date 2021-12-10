# 520-Project-Ibhir-Maheux-Saban

MERN stack project.

Geo location of parking and signal panel in the city of Montreal.

## Getting started

## Data urls
https://www.donneesquebec.ca/recherche/dataset/vmtl-stationnements-deneigement#

https://storage.googleapis.com/dx-montreal/resources/cef524c0-c805-4983-a6bd-ac23c8fdfe37/stationnements_h_2020_2021.geojson?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Expires=60&X-Amz-Credential=GOOG1EM55P356HYDSB5BC4M4SBSA6Q7NQVVTNVVFSZOBSOVIVW5ZADICRGUKA%2F20211105%2Feurope-west1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Date=20211105T180246Z&X-Amz-Signature=3707eb6ccd4b227b5aeb286990516e3e85d1bcb6e6951085f7363cbe8a2dc77e

## Logo url

https://pixabay.com/vectors/parking-p-alphabet-letter-abc-99211/

## Performance

When Idle:

![alt idle_lightHouse](https://i.imgur.com/yOPvcKW.png)

When Moving around:

![alt idle_lightHouse](https://i.imgur.com/PJj7bSi.png)


* LightHouse report gave a score of 72 when naviguating around and 92 when IDLE.

* CPU usage peaks when the user either zoom out or in with the cluster moving around.

* When zooming in or out, they are some frame drops.

![alt idle_lightHouse](https://i.imgur.com/p4VEw2f.png)

### Benchmarked on - for client side:

* Viewport: 1920x1080p
* Windows 10 Home
* Ryzen 5 2600
* RX 580 - Hardware Acceleration ON
* 16 GB ram
* 60 Mbps Download.
* 10 Mbps Upload.

#### Browsers

Firefox Version 95.0 (Official Build) (64-bit)
Google Chrome Version 96.0.4664.93 (Official Build) (64-bit)

### Network
- Pictures for the tiles of the map requires a lot of requests.
- The tiles formate given in the network transfer are '.png'.

- client cache disable.
- Disable cache (client) & Slow 3G:
	- DOMContentLoaded: ~6s
	- The react component with the cluster and data are loading relatively fast
	- The pictures of the map are loading extremely slow - up to 10 seconds minimum
	- the request for the queries are fast. ~ 3 seconds within specified bounds.

- Disable cache (server & server) & Slow 3G:
	- DOMContentLoaded: ~6s
	- The react component with the cluster and data are loading relatively fast
	- yet the pictures of the map are still loading extremely slow - up to 10 		seconds minimum
	- the request for the queries are a bit less faster. ~ 4-5 seconds within specified bounds.

#### No siginificant changed noticeable betwen disable server cache and enabled.

We have to keep in mind that we are testing it with a single user (Estefan).

- Disable cache (client) & No throttle:
	- The navigation is smooth.
	- The tiles loads fast.
	- most request takes mere milliseconds 
	- ~10-60ms for tiles
	- queries take around 40ms.

## Performance pertaining to server cashing and compression.
After disabling cashing and compression on the server code, The performance score drops from 94 to 88.
The size of the response body increases to 32.4 kb and fetching the polygon query takes 60 ms.

It might seems like it does not matter since it increases around 20-40ms more which is not noticeable on the end user.
In contrary, if we think on a greater aspect of the network trafficking with multiple users, this subtle change can be extremely noticeable
since it has a snowball effect.

In conclusion, caching and compression is extremely important to save some time for requests for the end user and the server side.
