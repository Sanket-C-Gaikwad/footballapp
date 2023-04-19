// Parts
function Part(slot, price, name, description) {
	this.slot = slot;
	this.price = price;
	this.name = name;
	this.description = description;
}

// Data sets
function available_parts() {
	
	var ids = id_f();
	
	switch(sessionStorage.getItem(ids[0])) {
		case '0': 
			var parts_mod1 = [
				new Part(1,0,"Standard Wheels","The standard wheels are fitted free of charge on request."),
				new Part(1,449.95,"Spoked Wheels","The elaborately manufactured thin-wall rims offer extravagance at a special price."),
				new Part(1,739.95,"Spinning Wheels","The outer parts of these wheels continue to rotate while you have to wait at the traffic lights."),
				new Part(2,0,"Standard Exhaust","The standard dual exhaust is installed free of charge upon request."),
				new Part(2,29.95,"Wide Exhaust","The widened outlets of this exhaust system provide a sound that can be heard from afar."),
				new Part(2,49.95,"Round Exhaust","The round outputs provide an unobtrusive but defined sound."),
				new Part(3,0,"Standard Front Bumper","The standard deep front bumper lets you glide across the asphalt in style. It is included free of charge in the standard equipment."),
				new Part(3,119.95,"Tuning Front Bumper","The particularly deep front bumper complements other deep components perfectly."),
				new Part(4,0,"Standard Rear Bumper","The standard rear bumper provides a larger crumple zone for increased safety. It is included free of charge in the standard equipment."),
				new Part(4,119.95,"Tuning Rear Bumper","The particularly deep rear bumper complements other deep components perfectly."),
				new Part(5,0,"Standard Sills","The standard long sill offers a dynamic contour line. It is included free of charge in the standard equipment."),
				new Part(5,29.95,"Tuning Sills","This side skirt makes your car look like it floats."),
				new Part(6,0,"Standard Hood","The usual hood of the engine compartment is adorned only by our logo."),
				new Part(6,149.95,"Tuning Hood","Special openings guarantee optimal cooling of the engine compartment."),
				new Part(7,0,"Standard Mirrors","The standard exterior mirrors provide a good view to the rear. They are included free of charge in the standard equipment."),
				new Part(7,19.95,"Thin Mirrors","Two flat mirrors that make you look even more dynamic while driving."),
				new Part(8,0,"Standard Skylight","The standard skylight offers a clear view of the sky. It is included free of charge in the standard equipment."),
				new Part(8,99.95,"Tuning Skylight","The Triangle™ Tuning roof vent helps you keep a cool head while driving."),
				new Part(8,129.95,"Special-Dual Skylight","The roof module's Special-Dual vents ensure optimal airflow and a natural driving experience.")
			];
			return parts_mod1; break;
		default: return;
	}
}

function set_names() {
    return [ ["Blue","Green","Red"], ["Standard","Spokes","Spinner"],["Standard","Wide","Round"], ["Standard","Lowered"], ["Standard","Lowered"], ["Standard","Tuning"], ["Standard","Frog"], ["Standard","Thin"], ["Standard","Tuning","Dual"] ];
}

function id_f() {
	// Die Bezeichnungen der ID-Komponenten
	
	// 0. Modell
	// 1. Farbe
	
	var idArray = ["model","color"];
	return idArray;
}

function models_f() {
	// verfügbare Automodelle
	
	// 0. Triangle Deluxe Limousine
	
	var modelArray = [ ["Triangle_Deluxe","25000"] ];
	return modelArray;
}

function slots_f() {
	// Slots der Teile in Baureihenfolge
	
	// 0. Hauptmodell (mit Licht)
	// 1. Räder
	// 2. Auspuff
	// 3. Stoßstange vorn
	// 4. Stoßstange hinten
	// 5. Seitenschweller
	// 6. Motorhaube
	// 7. Spiegel
	// 8. Dachfenster
	
	var slotArray = [ ["main_Part","Main model"], ["tires","Wheels"], ["exhaust","Exhausts"], ["bumper_front","Front bumpers"], ["bumper_back","Rear bumpers"], ["side","Side sills"], ["cowling","Hoods"], ["mirrors","Mirrors"], ["skylight","Skylights"] ];
	return slotArray;
}

function colors_f() {
	// Array zur Kodierung der Farben zu Zahlen

	// 0. blau #081836
	// 1. grün
	// 2. rot
	
	var colorArray = [ ["blue","1828B6"] , ["green","009020"] , ["red","FF0000"] ];
	return colorArray;
}

function views_f() {
	// Ansichten
	
	// 0. Hauptansicht, großes Bild
	// 1. linker Slot unter dem Hauptbild
	// 2. mittlerer Slot
	// 3. rechter Slot
	
	var viewArray = ["selected","left","middle","right"];
	return viewArray;
}

// Leisten
function create_main_menu() {
	var models = models_f();
	var colors = colors_f();
	var ids = id_f();
	
	var content = "<table width='100%'><tr><td width='50%' class='main_menue'>Model: ";
	
	for(var i=0; i<models.length; i++) {
		content += "<img src='static/img/" + models[i][0] + "/Logo.png' class='logo ";
		if(i==sessionStorage.getItem(ids[0]))
			content += "selected'";
		else
			content += "unselected cursor' "; //onclick='confirm(\"Durch das Wechseln des Hauptmodells wird Ihre Konfiguration verworfen. Fortfahren?\")'
		
		content += "/>&emsp;"
	}
	content += "</td><td class='main_menue'>Colors: ";
	
	for(var i=0; i<colors.length; i++) {
		content += "<div class='color cursor' style='background:#" + colors[i][1] + ";border:5px solid black;' onclick='changeColor(" + i + ")'></div>&emsp;";
	}
	
	content += "</td></tr></table>";
	
	return content;
}

function create_kit(parts,amounts,show,sel) {
	var content = "";
	var slots = slots_f();
	var sign = "+";
	
	for(var i=1; i<slots.length; i++) {		
		content += "<div class='slot_option cursor'  onclick='document.getElementsByClassName(\"side_l\")[0].innerHTML=create_kit(parts,amounts,"+ ((show==i)? "" : i) +")'><b>" + ((show==i)? "- " : "+ ") + slots[i][1] + "</b></div>";
		if(show==i) {
			for(var u=0; u<(amounts[i]-amounts[i-1]); u++) {
				content += "<div class='slot_option cursor part' " + (sel==u?"style='background:#909090;'":"") + " onclick='document.getElementsByClassName(\"short_info\")[0].innerHTML=create_short_info(amounts,parts[amounts["+i+"-1]+"+u+"],"+(u+1)+");this.parentNode.innerHTML=create_kit(parts,amounts,"+i+","+u+")'><span>" + parts[amounts[i-1]+u].name + "</span></div>";
			}
		}
	}
	
	return content;
}

function create_info(parts,amounts) {
	//var content = "<table width='100%' height='100%'><tr height='50%'><td width='60%' style='text-align:left;vertical-align:top;'>";
	var content = "<table width='100%' height='100%'><tr height='30px'><td width='60%' style='text-align:left;vertical-align:top;'>";
	var slots = slots_f();
	var ids = id_f();
	var models = models_f();
	
	content += "<b>Selected parts:</b></td><td style='text-align:right;vertical-align:top;font-family:\"Courier New\";'><b>Prices:</b></td></tr>";
	content += "<tr height='20px'><td width='60%' style='text-align:left;vertical-align:top;'>Vehicle basic costs</td><td style='text-align:right;vertical-align:top;font-family:\"Courier New\";'>" + parseFloat(models[sessionStorage.getItem(ids[0])][1]).toFixed(2) + " €</td>";

	//</br></br>Vehicle costs</br>";
	for(var i=1; i<slots.length; i++) {
		content += "<tr height='20px'><td width='60%' style='text-align:left;vertical-align:top;'>" + build_in_parts_name(parts,amounts,i) + "</td>";
		content += "<td style='text-align:right;vertical-align:top;font-family:\"Courier New\";''>" + build_in_parts_price(parts,amounts,i) + " €</td>";
	}
	//content += "</br><b><u>Total costs:</u></b>";
	
	//content += "<td style='text-align:right;vertical-align:top;font-family:\"Courier New\"'>";
	//content += "<b>Prices:</b></br></br>" + parseFloat(models[sessionStorage.getItem(ids[0])][1]).toFixed(2) + " €</br>";
	
	//for(var i=1; i<slots.length; i++) {
	//	content += build_in_parts_price(parts,amounts,i) + " €</br>";
	//}
	content += "<tr><td width='60%' style='text-align:left;vertical-align:top;font-size:24px'><b><u>Total costs:</u></b></td>";
	content += "<td style='text-align:right;vertical-align:top;font-family:\"Courier New\";font-size:24px'><b><u>" + (parseFloat(build_in_parts_price(parts,amounts))+parseFloat(models[sessionStorage.getItem(ids[0])][1]) ).toFixed(2) + " €</u></b></td></tr>";

	//content += "</br><b><u>" + (parseFloat(build_in_parts_price(parts,amounts))+parseFloat(models[sessionStorage.getItem(ids[0])][1]) ).toFixed(2) + " €</u></b>";
	
	//content += "</td>";
	content += "<tr><td style='text-align:center;margin-left:10px;margin-right:10px;padding:20px;' colspan='2'><button onclick='order_now()'>Order now!</button></td></tr></table>";
	return content;
}

function order_now() {
    //prompt("Thanks for your interest!");
    var slots = slots_f();
    var sets = set_names();
    var selection = {color:sets[0][sessionStorage.getItem("color")]};
    for(let i=1; i<slots.length; i++) {
        selection[slots[i][0]] = (sets[i][sessionStorage.getItem(slots[i][0])-1]);
    }
    console.log(selection);

    fetch("/lead_time", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(selection)
    }).then(res => {
        res.text().then( function (text) {
        console.log(text)
        alert("Your order will be processed. The expected lead time is " + text + " days.");
        });
    });

}

function create_short_info(amounts,part,level) {
	
	var slots = slots_f();
	var content = "";
	if(part==undefined) {
		content += "<b style='color:#000000;text-shadow:0px 0px 5px #FFFFFF;'>If you select a part from the construction kit above this box, further information will be displayed here.</b>";
	} else {
		content += "<div style='width:100%;border:1px solid black;'><b>" + part.name + "</b></div>";
		content += "<div style='width:100%'><i>" + part.description + "</i></div>";
		content += "<div align='center' width='100%'><b><u>Price:</u> <font color='#C00000'>" + part.price + " €</font></b></br>";
		var isIn = (sessionStorage.getItem(slots[part.slot][0])==level);
		content += "<button type='button' id='build_button'" + (isIn?"disabled":"") + " onclick='install_part("+part.slot+","+level+");document.getElementsByClassName(\"side_r\")[0].innerHTML=create_info(parts,amounts);'>" + (isIn?"Already installed":"Install!") + "</button></div>";
	}
	return content;
}

// Hilfsfunktionen
function install_part(slot,level,back, manual = true) {
	// die vier Ansichten werden anhand ihrer ID (Slotname Unterstrich Ziffer des Views, z.B. "skylight_0" gesucht und geändert
	var slots = slots_f();
	var models = models_f();
	var ids = id_f();
	var colors = colors_f();
	document.getElementById(slots[slot][0]+"_0").src = "static/img/" + models[sessionStorage.getItem(ids[0])][0] + "/" + colors[sessionStorage.getItem(ids[1])][0] + "/" + slots[slot][0] + "/" + level + "/0.png";
	document.getElementById(slots[slot][0]+"_1").src = "static/img/" + models[sessionStorage.getItem(ids[0])][0] + "/" + colors[sessionStorage.getItem(ids[1])][0] + "/" + slots[slot][0] + "/" + level + "/1.png";
	document.getElementById(slots[slot][0]+"_2").src = "static/img/" + models[sessionStorage.getItem(ids[0])][0] + "/" + colors[sessionStorage.getItem(ids[1])][0] + "/" + slots[slot][0] + "/" + level + "/2.png";
	document.getElementById(slots[slot][0]+"_3").src = "static/img/" + models[sessionStorage.getItem(ids[0])][0] + "/" + colors[sessionStorage.getItem(ids[1])][0] + "/" + slots[slot][0] + "/" + level + "/3.png";

	if(manual)
	{
        var build_button = document.getElementById("build_button");
        var temp = sessionStorage.getItem(slots[slot][0]);
        if(back==true) {
            build_button.innerHTML = "Install!";
            build_button.onclick = function() { install_part(slot,temp);  }; //document.getElementsByClassName("side_r")[0].innerHTML = create_info(parts,amounts);
        }
        else {
            build_button.innerHTML = "Undo last step?";
            build_button.onclick = function() { install_part(slot,temp,true); }; //document.getElementsByClassName("side_r")[0].innerHTML = create_info(parts,amounts);
        }
	}
	sessionStorage.setItem(slots[slot][0],level);
	document.getElementsByClassName("side_r")[0].innerHTML = create_info(parts,amounts);
	
}

function change_view(pos) {
	// pos = angeklickte Position: links = 1, Mitte = 2, rechts = 3
	// temp = Ansicht in Großformat, clicked = angeklickte Ansichte
	// angeklickt wird zur Großansicht, schräge Ansicht kommt in den geklickten Slot, das ehemalige Bild in Großformat kommt in seinen alten Slot zurück
	var views = views_f();
	var temp = sessionStorage.getItem(views[0]);
	var clicked = sessionStorage.getItem(views[pos]);
	
	sessionStorage.setItem(views[0],clicked);
	sessionStorage.setItem(views[pos], temp);
	
	if(clicked != 0 && temp != 0) {
		sessionStorage.setItem(views[temp], temp);
		sessionStorage.setItem(views[pos], 0);
		document.getElementById(views[temp]).innerHTML = picture ( sessionStorage.getItem(views[temp]) );
	}
	
	document.getElementById(views[0]).innerHTML = picture( sessionStorage.getItem(views[0]) );
	document.getElementById(views[pos]).innerHTML = picture( sessionStorage.getItem(views[pos]) );
}

function picture(view) {
	var imgclass = "";
	
	if(view == sessionStorage.getItem(views_f()[0]))
		imgclass = "class='main' ";
	else
		imgclass = "class='small' ";
		
	var output = "<img src='static/img/BG.png' " + imgclass + "/>";
	var models = models_f();
	var slots = slots_f();
	var colors = colors_f();
	var ids = id_f();
	
	for(var i=0; i<slots.length; i++) {
		var id = sessionStorage.getItem(slots[i][0]);
		var filename = "static/img/" + models[sessionStorage.getItem(ids[0])][0] + "/" + colors[sessionStorage.getItem(ids[1])][0] + "/" + slots[i][0] + "/" + id + "/" + view + ".png";
		output += "<img src='" + filename + "' alt='' onerror='style.display=\"none\"' " + imgclass + " id='" + slots[i][0] + "_" + view + "'/>";
	}
	
	return output;
}

function changeColor(col) {
	var ids = id_f();
	var views = views_f();
	sessionStorage.setItem(ids[1],col);
	
	for(var i=0; i<views.length; i++) {
		document.getElementById(views[i]).innerHTML = picture(sessionStorage.getItem(views[i]));
	}
}

function initialize() {
	// Falls nichts gespeichert, Standardkonfiguration aufsetzen
	// IDs entsprechen dem "Level" des Bauteils
	
	// Model = Deluxe, Farbe = blau
	var ids = id_f();
	if(sessionStorage.getItem(ids[0]) == null) {
		for(var i=0; i<ids.length; i++) {
			sessionStorage.setItem(ids[i],0);
		}
	}
	
	// Slots mit Standard-Teilen Level 1 belegen, falls noch nichs vorhanden
	var slots = slots_f();
	if(sessionStorage.getItem(slots[0][0]) == null) {
		for(var i=0; i<slots.length; i++) {
			sessionStorage.setItem(slots[i][0], 1);
		}
	}
	
	// Falls keine Ansicht gewählt -> Hauptansicht
	// 0. Hauptansicht
	// 1. Front
	// 2. Seite
	// 3. Heck
	var views = views_f();
	if(sessionStorage.getItem(views[0]) == null) {
		for(var i=0; i<views.length; i++) {
			sessionStorage.setItem(views[i],i);
		}
	}
	
}

function build_in_parts_price(parts,amounts,slot) {
	var slots = slots_f();
	var at = 0;
	
	// wenn Slot angegeben -> gib Preis des Teils zurück
	if(slot!=undefined) {
		at = parseInt(amounts[slot-1])+parseInt(sessionStorage.getItem(slots[slot][0]))-1;
		return parts[at].price.toFixed(2);
	} else {
		// wenn kein Slot angegeben -> gib Gesamtpreis zurück
		var price = 0;
		for(var i=1; i<slots.length; i++) {
			at = parseInt(amounts[i-1])+parseInt(sessionStorage.getItem(slots[i][0]))-1;
			price += parts[at].price;
		}		
		return price.toFixed(2);
	}
	
	return;
}

function build_in_parts_name(parts,amounts,slot) {
	var slots = slots_f();
	var at = parseInt(amounts[slot-1])+parseInt(sessionStorage.getItem(slots[slot][0]))-1;
	return parts[at].name;
}

function part_amounts(parts) {
	var slots = slots_f()
	// aufsummierte Anzahlen
	var amounts = Array(slots.length).fill(0);
	var counter = 1;
	
	for(var i=0; i<parts.length; i++) {
		if(parts[i].slot==counter) {
			amounts[counter]++;
		}
		else {
			amounts[++counter] += (amounts[counter-1]+1);
		}
	}
	
	return amounts;
}

function get_custom() {
    var city = document.getElementById("city").value;
    var age = document.getElementById("age").value;
    var gender = document.querySelector('input[name = "gender"]:checked').value;
    var job = document.getElementById("job_title").value;

    if(age=="") {
        age = 45;
    } else if (age<18) {
        age = 18;
    } else if (age>75) {
        age = 75;
    }

    document.getElementById("o_c").innerHTML = "<h1>Please wait, your personalized recommendation is getting created.</h1>";

    fetch("/get_recomm", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
      city:city,age:age,gender:gender,job:job})
    }).then(res => {
        res.text().then( function (text) {
        console.log(text)
        var output = JSON.parse(text);
        var sets = set_names();
        //console.log(output[0]);
        changeColor(sets[0].indexOf(output[0]));

        for(let i=1; i<output.length; i++) {
            console.log("i="+i+" --- sets[i].indexOf(output[i])="+sets[i].indexOf(output[i]));
            // levels start with 1
            install_part(i,sets[i].indexOf(output[i])+1,true,false);
        }

        document.getElementById("o_c").innerHTML = "";
        document.body.classList.toggle("activeForm");
      });
    });

    //console.log(xmlHttp.responseText);

}