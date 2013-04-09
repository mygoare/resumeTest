//written by mygoare

String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};

function getElementsByClass (className, tagName) {
  var classElements = new Array();
  if (tagName == null) {
    tagName = "*";
  }

  var ele = document.getElementsByTagName(tagName);

  for (var i=0; i < ele.length; i++) {
    if (ele[i].className.indexOf(className) != -1) {
      classElements.push(ele[i]);
    }
  }

  return classElements;
}

function isIe () {
  return (window.navigator.appVersion.toLowerCase().indexOf('msie') == -1) ? false : true;
}

function parentUpTo (ele, upTo) {  //upTo is className or tagName
  var eleP = ele.parentNode;
  while(eleP){
    if (eleP.className.indexOf(upTo) != -1 || eleP.tagName.toLowerCase() == upTo) {
      break;
    } else {
      eleP = eleP.parentNode;
    }
  }
  return eleP;
}

function childDownTo (ele, DownTo, tagName) {
  if (tagName == null) {
    tagName = "*";
  }
  var eleC = ele.getElementsByTagName(tagName);
  var c_arr = [];
  for (var i=0; i < eleC.length; i++) {
    if (eleC[i].className.indexOf(DownTo) != -1) {
      c_arr.push(eleC[i]);
    }
  }
  if (c_arr.length == 1) {
    c_arr = c_arr[0];
  }
  return c_arr;
}

function removeSelf (ele) {
  return ele.parentNode.removeChild(ele);
}

function bindEvent(ele, event, fun){
  if (ele == "") {
    return false;
  }
  if (event == "click") {
    if (ele.constructor == Array) {
      for (var i=0; i < ele.length; i++) {
        ele[i].onclick = fun;  // 弃用 addEventListener & attachEvent cause of their *this* returned different
      }
    } else {
        ele.onclick = fun;
    }
  }
}

function delArticle () {
  var list_items = parentUpTo(this, 'list-items');
  removeSelf(list_items);
}

function delSkills () {
  var skills = parentUpTo(this,'span');
  removeSelf(skills);
}

function showPopBlock () {
  //clear clean
  var pop_blocks = getElementsByClass('pop-block');
  for (var i=0; i < pop_blocks.length; i++) {
    pop_blocks[i].style.display = "none";
  }
  var list_items = getElementsByClass('list-items');
  for (var i=0; i < list_items .length; i++) {
    list_items[i].style.zIndex = "0";
  }

  parentUpTo(this, 'list-items').style.zIndex = '1'; // fix ie7 z-index bug
  parentUpTo(this, 'items-detail').nextSibling.nextSibling.nextSibling.nextSibling.style.display = "block";

  // focus on input
  childDownTo(parentUpTo(this, 'items-detail').nextSibling.nextSibling.nextSibling.nextSibling, 'input-add', 'input').focus();
}

function hidePop () {
  // this.parentUpTo('pop-block')
  parentUpTo(this, 'pop-block').style.display = "none";
  parentUpTo(this, 'list-items').style.zIndex = '0';
}

function saveSkills () {
  var skills_p = childDownTo(parentUpTo(this, 'list-items'), 'skills', 'div');
  var add_vals = this.previousSibling.previousSibling.value;
  var vals_arr = add_vals.split(",");
  if (vals_arr == 0) {
    return false;
  }
  for (var i=0; i < vals_arr.length; i++) {
    vals_arr[i] = vals_arr[i].trim();
    if (vals_arr[i] != "") {
      var del = document.createTextNode("+");
      var a2 = document.createElement("a");
      a2.appendChild(del);
      a2.setAttribute("class", "skills-del");
      a2.setAttribute("href", "javascript:;");
      var val = document.createTextNode(vals_arr[i]);
      var a1 = document.createElement("a");
      a1.appendChild(val);
      a1.setAttribute("href", "");
      var span = document.createElement("span");
      span.appendChild(a1);
      span.appendChild(a2);
      skills_p.appendChild(span);
    }
  }
  //rebind
  bindEvent(getElementsByClass('skills-del'), 'click', delSkills);
  this.previousSibling.previousSibling.value = "";

  parentUpTo(this, 'pop-block').style.display = "none";
  parentUpTo(this, 'list-items').style.zIndex = '0';
}

bindEvent(getElementsByClass('del-article'), 'click', delArticle );
bindEvent(getElementsByClass('skills-del'), 'click', delSkills);
bindEvent(getElementsByClass('add-skills'), 'click', showPopBlock);
bindEvent(getElementsByClass('hide-pop'), 'click', hidePop);

bindEvent(getElementsByClass('save-skills'), 'click', saveSkills);
