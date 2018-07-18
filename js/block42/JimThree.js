var container, stats;
var controls;
var camera, scene, renderer;

var gridHelper;


var ground;
var params = { opacity: 0.5 };


function init() 
{

	// build up the threejs environment
	container = document.createElement( 'div' );
	document.body.appendChild( container );

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.set(-50,0,0);
	controls = new THREE.OrbitControls( camera );

	var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
	scene.add( ambientLight );

	var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
	camera.add( pointLight );
	scene.add( camera );
	
	gridHelper = new THREE.GridHelper( 100, 22 );
	//scene.add( gridHelper );


	//renderer = new THREE.CanvasRenderer();
	renderer = new THREE.WebGLRenderer();
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	stats = new Stats();
	container.appendChild( stats.dom );

	//init the outline feature
	initOutline();


	var poslist = [];
	var id = 0;

	for (var xi = 0; xi <10; xi++) {
		for (var yi = 0; yi <10; yi++) {

			var pos = [xi*128, yi*128];
			poslist.push(pos);


			new THREE.MTLLoader()
			.load( 'Shibuya.mtl', function ( materials ) {

				materials.preload();

				new THREE.OBJLoader()
					.setMaterials( materials )
					.load( 'Shibuya.obj', function ( object ) {
						id++;

						object.position.x += poslist[id][0];
						object.position.z += poslist[id][1];
						scene.add( object );
						//console.log(poslist[id]);
					});
			} );
		}
	}

	animate();
}

function animate() 
{
	stats.update();
	render();
	requestAnimationFrame( animate );

}

function render() 
{
	//since i used the outline feature, i call the composer to update
	composer.render();
	//renderer.render( scene, camera );
}