//This is code originally by https://nepeta.mozai.com/stories/howto.html
//but editted in a way so I can understand it myself :)

let prev_arrow = " <= Prev";
let next_arrow = "Next => ";
let pages;
let page = 0,
  started = false,
  showingall = false;
function AddEvent(e, a, b) {
  if (e.attachEvent) {
    e.attachEvent("on" + a, function () {
      b.call(e);
    });
  } else if (e.addEventListener) {
    e.addEventListener(a, b, false);
  }
}
function dce(t, a) {
  let e = document.createElement(t);
  for (let i in a) {
    e.setAttribute(i, a[i]);
  }
  return e;
}
function cb_show(p) {
  if (p == null) {
    p = 0;
  }
  if (p < 0 || p > pages.length) {
    throw new RangeError();
  }
  for (let i = 0; i < pages.length; i++) {
    pages[i].style.display = "none";
  }
  window.scrollTo(document.getElementsByTagName("div")[0].offsetLeft, 0);
  pages[p].style.display = "block";
  page = p;
  update_nav();
  return false;
}
function cb_next() {
  if (page + 1 < pages.length) {
    cb_show(page + 1);
  }
}
function cb_prev() {
  if (page > 0) {
    cb_show(page - 1);
  }
}
function mknav(l) {
  let t, tr, td;
  t = dce("table", {
    border: 0,
    cellspacing: 0,
    cellpadding: 0,
    class: "navbar",
  });
  tr = dce("tr", {});
  td = dce("td", { align: "left" });
  td.innerHTML = prev_arrow;
  AddEvent(td, "click", cb_prev);
  tr.appendChild(td);
  if (l == "foot") {
    td = dce("td", { align: "center", id: "pagenum" });
    td.innerHTML = "< 0/0 >";
    tr.appendChild(td);
  }
  td = dce("td", { align: "right" });
  td.innerHTML = next_arrow;
  AddEvent(td, "click", cb_next);
  tr.appendChild(td);
  t.appendChild(tr);
  return t;
}
function update_nav() {
  let a = document.getElementById("pagenum");
  if (a) {
    a.innerHTML = "< " + page + "/" + (pages.length - 1) + " >";
  }
}
function cb_init() {
  let a = document.getElementsByTagName("div");
  pages = new Array();
  for (let i = 0; i < a.length; i++) {
    if (a[i].className == "page") {
      pages.push(a[i]);
    }
  }
  document.getElementById("loading").style.display = "none";
  if (!started) {
    started = true;
    let b = document.getElementsByTagName("body")[0];
    b.insertBefore(mknav("head"), b.firstChild);
    b.appendChild(mknav("foot"));
    cb_show(0);
  } else {
    update_nav();
  }
}
AddEvent(window, "load", cb_init);
