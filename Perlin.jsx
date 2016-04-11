#target estoolkit
var win, windowResource;
 
windowResource = "palette {  \
    orientation: 'column', \
    alignChildren: ['fill', 'top'],  \
    preferredSize:[300, 130], \
    text: 'ScriptUI Window - palette',  \
    margins:15, \
    \
    sliderPanel: Panel { \
        orientation: 'row', \
        alignChildren: 'right', \
        margins:15, \
        text: ' PANEL ', \
        st: StaticText { text: 'Value:' }, \
        sl: Slider { minvalue: 1, maxvalue: 100, value: 30, size:[220,20] }, \
        te: EditText { text: '30', characters: 5, justify: 'left'} \
        } \
    \
    bottomGroup: Group{ \
        cd: Checkbox { text:'Checkbox value', value: true }, \
        cancelButton: Button { text: 'Cancel', properties:{name:'cancel'}, size: [120,24], alignment:['right', 'center'] }, \
        applyButton: Button { text: 'Apply', properties:{name:'ok'}, size: [120,24], alignment:['right', 'center'] }, \
    }\
}"
 
win = new Window(windowResource);
 
win.bottomGroup.cancelButton.onClick = function() {
  return win.close();
};
win.bottomGroup.applyButton.onClick = function() {
  return win.close();
};
 
win.show();

// Set Adobe Photoshop to use pixels and display no dialogs.
app.preferences.rulerUnits = Units.PIXELS;
app.displayDialogs = DialogModes.NO;

var doc = app.activeDocument;

// Get the document dimensions.
var documentWidthAsInteger = app.activeDocument.width.value ; 
var documentHeightAsInteger = app.activeDocument.height.value ;

var perm = new Array(512);
var gradP = new Array(512);

//6t^5-15t^4-10t^3
function fade(t) {
    return t*t*t*(t*(t*6-15)+10);
}

//interpolate between two values
function lerp(a, b, t) {
    return (1-t)*a + t*b;
}

dot2 = function(x, y) {
    return this.x*x + this.y*y;
  };

//generate perlin noise
function perlin(x, y) {
	var X = Math.floor(x);
    var Y = Math.floor(y);

    x = x - X;
    y = y - Y;

    X = X & 255;
    Y = Y & 255;

    var n00 = gradP[X+perm[y]].dot2(x,y);
    var n01 = gradP[X+perm[y+1]].dot2(x,y-1);
    var n10 = gradP[X+1+perm[y]].dot2(x-1,y);
    var n11 = gradP[X+1+perm[y+1]].dot2(x-1,y-1);

    var u = fade(x);

    return lerp(
        lerp(n00, n10, u),
        lerp(n01, n11, u),
        fade(y));
}

function generateNoise() {
    for (var x=0; x<documentWidthAsInteger; x++) {
        for (var y = 0; y < documentHeightAsInteger.length; y++) {
            var value = Math.abs(perlin(x/100, y/100));
            value *= 256;

            

        };
    }
}