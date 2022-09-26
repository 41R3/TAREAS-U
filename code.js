const CLAVE_LOCALSTORAGE = "toDoList";
document.addEventListener("DOMContentLoaded", () => {
	let listas = [];
	 $contener = document.querySelector("#contener"), $btnguardarlist = document.querySelector("#btnagregar"),
		  $inputnewlist = document.querySelector("#inputnewlist")
	$allcheck = document.querySelector("#allcheck");


	$btnguardarlist.onclick = () => {
		lista = $inputnewlist.value;
		if (!lista) {
			return;}
		listas.push({
			lista: lista,
			fin: false,});
		$inputnewlist.value = "";
		guardar();
		refresc();};


	 obtener = () => {
		ubicacion = JSON.parse(localStorage.getItem(CLAVE_LOCALSTORAGE));
		if (ubicacion) {return ubicacion;
		} else {
			return [];}
	};

	guardar = () => {
		localStorage.setItem(CLAVE_LOCALSTORAGE, JSON.stringify(listas));
	};

	refresc = () => {$contener.innerHTML = " ";
		for (const [indexx, lista] of listas.entries()) {
			$borrar = document.createElement("a");
			$borrar.classList.add("borrar");
			$borrar.innerHTML = "&times;";
			$borrar.href = " ";
			$borrar.onclick = (evento) => {
				listas.splice(indexx, 1);
				guardar();
				refresc();
			};
			 $checkbox = document.createElement("input");
			$checkbox.type = "checkbox";
			$checkbox.onchange = function () {
				if (this.checked) {
					listas[indexx].fin= true;
				} else {
					listas[indexx].fin = false;
				}
				guardar();
				refresc();
			}


			$info = document.createElement("info");
			$info.textContent = lista.lista;
			 $li = document.createElement("li");

			if (lista.fin) {
				$checkbox.checked = true;
				$info.classList.add("tachar");
			}

			$allcheck.onclick= () => {

				function selects(){
					$checkbox = document.createElement("input");
					$checkbox.type = "checkbox";

					if (this.checked) {

						$info.classList.add("tachar");
					}
				}
			}

			$li.appendChild($checkbox);
			$li.appendChild($info);
			$li.appendChild($borrar);
			$contener.appendChild($li);
		}
	};

	listas = obtener();
	refresc();
});
