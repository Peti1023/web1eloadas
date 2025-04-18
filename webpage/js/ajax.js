const API_URL = "http://gamf.nhely.hu/ajax2/";
const MY_CODE = "GIOIS8ASD123";

document.addEventListener("DOMContentLoaded", () => {
    fetchData();
    setupForm();
});

async function fetchData() {
    try {
        const data = await postData({ op: "read" });
        renderTable(data.list);
    } catch (error) {
        showError("Hiba történt az adatok frissítésekor!", error);
    }
}

function renderTable(records) {
    const container = document.querySelector(".mainSect");
    container.innerHTML = "<h2>Adatok</h2>";

    const rows = records.map(record => `
        <tr>
            <td>${record.id}</td>
            <td>${record.name}</td>
            <td>${record.height}</td>
            <td>${record.weight}</td>
            <td>
                <button onclick="handleEdit(${record.id})">Szerkesztés</button>
                <button onclick="handleDelete(${record.id})">Törlés</button>
            </td>
        </tr>
    `).join("");

    container.innerHTML += `
        <table>
            <tr>
                <th>ID</th>
                <th>Név</th>
                <th>Magasság</th>
                <th>Súly</th>
                <th>Műveletek</th>
            </tr>
            ${rows}
        </table>
    `;
}

function setupForm() {
    const container = document.querySelector("#addUser");

    container.innerHTML = `
        <form id="dataForm">
            <input type="hidden" id="recordId">
            <input type="text" id="name" placeholder="Név" required>
            <input type="number" id="height" placeholder="Magasság" min="1" required>
            <input type="number" id="weight" placeholder="Súly" min="1" required>
            <button type="submit" id="submitBtn">Hozzáadás</button>
            <button type="button" id="cancelBtn" style="display:none">Mégse</button>
        </form>
    `;

    const form = document.querySelector("#dataForm");
    const cancelBtn = document.querySelector("#cancelBtn");

    form.addEventListener("submit", handleSubmit);
    cancelBtn.addEventListener("click", resetForm);
}

async function handleSubmit(event) {
    event.preventDefault();

    const id = formValue("recordId");
    const name = formValue("name");
    const height = formValue("height");
    const weight = formValue("weight");

    if (!name || !height || !weight) return alert("Kérlek töltsd ki az összes mezőt!");
    if (name.length > 30) return alert("A név maximum 30 karakter lehet!");

    try {
        if (id) {
            await postData({ id, name, height, weight, op: "update" });
            alert("Rekord sikeresen frissítve!");
        } else {
            await postData({ name, height, weight, op: "create" });
            alert("Rekord sikeresen létrehozva!");
        }
        resetForm();
        fetchData();
    } catch (error) {
        showError("Hiba történt mentés közben!", error);
    }
}

async function handleEdit(id) {
    try {
        const data = await postData({ op: "read" });
        const record = data.list.find(item => item.id == id);

        if (record) {
            setFormValue("recordId", record.id);
            setFormValue("name", record.name);
            setFormValue("height", record.height);
            setFormValue("weight", record.weight);
            document.getElementById("submitBtn").textContent = "Frissítés";
            document.getElementById("cancelBtn").style.display = "inline-block";
        }
    } catch (error) {
        showError("Hiba történt a rekord betöltésekor!", error);
    }
}

async function handleDelete(id) {
    if (!confirm("Biztosan törölni szeretnéd ezt a rekordot?")) return;

    try {
        await postData({ id, op: "delete" });
        alert("Rekord sikeresen törölve!");
        fetchData();
    } catch (error) {
        showError("Hiba történt a rekord törlésekor!", error);
    }
}

// --- Hasznos kis segédfüggvények ---
function formValue(id) {
    return document.getElementById(id).value.trim();
}

function setFormValue(id, value) {
    document.getElementById(id).value = value;
}

function resetForm() {
    const form = document.getElementById("dataForm");
    form.reset();
    setFormValue("recordId", "");
    document.getElementById("submitBtn").textContent = "Hozzáadás";
    document.getElementById("cancelBtn").style.display = "none";
}

async function postData(paramsObj) {
    const params = new URLSearchParams({ ...paramsObj, code: MY_CODE });

    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString()
    });

    if (!response.ok) throw new Error("Hálózati hiba!");

    return await response.json();
}

function showError(msg, error) {
    console.error(msg, error);
    alert(msg);
}
