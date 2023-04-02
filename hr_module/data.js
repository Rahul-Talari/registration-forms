function namevalid(id) {
    var name = document.getElementById(id).value;
    for (i = 0; i < name.length; i++) {
        ch = name.charAt(i);
        if (!(ch >= 'a' && ch <= 'z') && !(ch >= 'A' && ch <= 'Z') && !(ch == ' ')) {
            alert('Only spaces and letters are allowed');
            document.getElementById(id).value = "";
        }
    }

}


function pincodevalid(id) {
    var regName = /^[1-9]{1}[0-9]{5}$/;
    var name = document.getElementById(id).value;
    if (!regName.test(name)) {
        alert('Enter valid postal code');
        document.getElementById(id).value = "";
    }
}

function aadharvalid(id) {
    var regName = /^[2-9]{1}[0-9]{11}$/;
    var name = document.getElementById(id).value;
    if (!regName.test(name)) {
        alert('Enter valid Aadhar number');
        document.getElementById(id).value = "";
    }
}

function pannumbervalid(id) {
    var regName = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    var name = document.getElementById(id).value;
    if (!regName.test(name)) {
        alert('Enter valid Pan number');
        document.getElementById(id).value = "";
    }
}

function mobilevalid(id) {
    var regName = /[5-9]{1}[0-9]{9}$/;
    var name = document.getElementById(id).value;
    if (!regName.test(name)) {
        alert('Enter valid mobile number');
        document.getElementById(id).value = "";
    }
}

function CheckDimension() {
    //Get reference of File.
    var fileUpload = document.getElementById("file");

    //Check whether the file is valid Image.
    var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(.jpg|.png|.gif)$");
    if (regex.test(fileUpload.value.toLowerCase())) {

        //Check whether HTML5 is supported.
        if (typeof(fileUpload.files) != "undefined") {
            //Initiate the FileReader object.
            var reader = new FileReader();
            //Read the contents of Image File.
            reader.readAsDataURL(fileUpload.files[0]);
            reader.onload = function(e) {
                //Initiate the JavaScript Image object.
                var image = new Image();

                //Set the Base64 string return from FileReader as source.
                image.src = e.target.result;

                //Validate the File Height and Width.
                image.onload = function() {
                    var height = this.height;
                    var width = this.width;
                    if (height > 2 || width > 2) {

                        //show width and height to user
                        document.getElementById("width").innerHTML = width;
                        document.getElementById("height").innerHTML = height;
                        alert("Height and Width must not exceed 200px.");
                        return false;
                    }
                    alert("Uploaded image has valid Height and Width.");
                    return true;
                };

            }
        } else {
            alert("This browser does not support HTML5.");
            return false;
        }
    } else {
        alert("Please select a valid Image file.");
        return false;
    }
}



(function() {

    "use strict"


    // Plugin Constructor
    var TagsInput = function(opts) {
        this.options = Object.assign(TagsInput.defaults, opts);
        this.init();
    }

    // Initialize the plugin
    TagsInput.prototype.init = function(opts) {
        this.options = opts ? Object.assign(this.options, opts) : this.options;

        if (this.initialized)
            this.destroy();

        if (!(this.orignal_input = document.getElementById(this.options.selector))) {
            console.error("tags-input couldn't find an element with the specified ID");
            return this;
        }

        this.arr = [];
        this.wrapper = document.createElement('div');
        this.input = document.createElement('input');
        init(this);
        initEvents(this);

        this.initialized = true;
        return this;
    }

    // Add Tags
    TagsInput.prototype.addTag = function(string) {

        if (this.anyErrors(string))
            return;

        this.arr.push(string);
        var tagInput = this;

        var tag = document.createElement('span');
        tag.className = this.options.tagClass;
        tag.innerText = string;

        var closeIcon = document.createElement('a');
        closeIcon.innerHTML = '&times;';

        // delete the tag when icon is clicked
        closeIcon.addEventListener('click', function(e) {
            e.preventDefault();
            var tag = this.parentNode;

            for (var i = 0; i < tagInput.wrapper.childNodes.length; i++) {
                if (tagInput.wrapper.childNodes[i] == tag)
                    tagInput.deleteTag(tag, i);
            }
        })


        tag.appendChild(closeIcon);
        this.wrapper.insertBefore(tag, this.input);
        this.orignal_input.value = this.arr.join(',');

        return this;
    }

    // Delete Tags
    TagsInput.prototype.deleteTag = function(tag, i) {
        tag.remove();
        this.arr.splice(i, 1);
        this.orignal_input.value = this.arr.join(',');
        return this;
    }

    // Make sure input string have no error with the plugin
    TagsInput.prototype.anyErrors = function(string) {
        if (this.options.max != null && this.arr.length >= this.options.max) {
            console.log('max tags limit reached');
            return true;
        }

        if (!this.options.duplicate && this.arr.indexOf(string) != -1) {
            console.log('duplicate found " ' + string + ' " ')
            return true;
        }

        return false;
    }

    // Add tags programmatically 
    TagsInput.prototype.addData = function(array) {
        var plugin = this;

        array.forEach(function(string) {
            plugin.addTag(string);
        })
        return this;
    }

    // Get the Input String
    TagsInput.prototype.getInputString = function() {
        return this.arr.join(',');
    }


    // destroy the plugin
    TagsInput.prototype.destroy = function() {
        this.orignal_input.removeAttribute('hidden');

        delete this.orignal_input;
        var self = this;

        Object.keys(this).forEach(function(key) {
            if (self[key] instanceof HTMLElement)
                self[key].remove();

            if (key != 'options')
                delete self[key];
        });

        this.initialized = false;
    }

    // Private function to initialize the tag input plugin
    function init(tags) {
        tags.wrapper.append(tags.input);
        tags.wrapper.classList.add(tags.options.wrapperClass);
        tags.orignal_input.setAttribute('hidden', 'true');
        tags.orignal_input.parentNode.insertBefore(tags.wrapper, tags.orignal_input);
    }

    // initialize the Events
    function initEvents(tags) {
        tags.wrapper.addEventListener('click', function() {
            tags.input.focus();
        });


        tags.input.addEventListener('keydown', function(e) {
            var str = tags.input.value.trim();

            if (!!(~[9, 13, 188].indexOf(e.keyCode))) {
                e.preventDefault();
                tags.input.value = "";
                if (str != "")
                    tags.addTag(str);
            }

        });
    }


    // Set All the Default Values
    TagsInput.defaults = {
        selector: '',
        wrapperClass: 'tags-input-wrapper',
        tagClass: 'tag',
        max: null,
        duplicate: false
    }

    window.TagsInput = TagsInput;

})();

var tagInput1 = new TagsInput({
    selector: 'tag-input1',
    duplicate: false,
    max: 10
});
tagInput1.addData([])
var tagInput2 = new TagsInput({
    selector: 'tag-input2',
    duplicate: false,
    max: 10
});
tagInput2.addData([])
var tagInput3 = new TagsInput({
    selector: 'tag-input3',
    duplicate: false,
    max: 10
});
tagInput3.addData([])
var tagInput4 = new TagsInput({
    selector: 'tag-input4',
    duplicate: false,
    max: 10
});
tagInput4.addData([])
var tagInput5 = new TagsInput({
    selector: 'tag-input5',
    duplicate: false,
    max: 10
});
tagInput5.addData([])
var tagInput6 = new TagsInput({
    selector: 'tag-input6',
    duplicate: false,
    max: 10
});
tagInput6.addData([])
var tagInput7 = new TagsInput({
    selector: 'tag-input7',
    duplicate: false,
    max: 10
});
tagInput7.addData([])
var tagInput8 = new TagsInput({
    selector: 'tag-input8',
    duplicate: false,
    max: 10
});
tagInput8.addData([])
var tagInput9 = new TagsInput({
    selector: 'tag-input9',
    duplicate: false,
    max: 10
});
tagInput9.addData([])






function add(type) {

    //Create an input type dynamically.
    var element = document.createElement("input");

    //Assign different attributes to the element.
    element.setAttribute("text", type);


    var foo = document.getElementById("fooBar");

    //Append the element in page (in span).
    foo.appendChild(element);

}