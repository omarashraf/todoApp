mainApp.controller('NotesController', function($location) {
	var self = this;
  	self.current = localStorage.getItem('currentUser');
    self.currentNote = "";

	self.add = function(note, privacy) {
		var notes = [];
    	notes = JSON.parse(localStorage.getItem('notes'));
    	notes.push({noteTitle: note, currentUser: self.current, private: privacy});
    	localStorage.setItem('notes', JSON.stringify(notes));
    	self.myNotes = JSON.parse(localStorage.getItem('notes')).filter(function(element) {
    		return element.currentUser == self.current;
    	});
        document.getElementById('new-todo').value = "";
        document.getElementById('note-privacy').checked = false;

	}
 	
	self.remove = function(index) {
		var notes = [];
    	notes = JSON.parse(localStorage.getItem('notes'));
    	notes.splice(index, 1);
    	localStorage.setItem('notes', JSON.stringify(notes));
		self.myNotes = JSON.parse(localStorage.getItem('notes')).filter(function(element) {
    		return element.currentUser == self.current;
    	});;
        var items = [];
        items = JSON.parse(localStorage.getItem('items'));
        items = items.filter(function(element) {
            return element.currentNote != self.currentNote;
        });
        localStorage.setItem('items', JSON.stringify(items));
        self.items = JSON.parse(localStorage.getItem('items')).filter(function(element) {
            return element.currentNote == self.currentNote;
        });
        self.currentNote = "";
        document.getElementById('note-components').style.visibility = 'hidden';
        document.getElementById('temp-msg').innerHTML = 'Select a note from the panel on the left';
	}
	
	self.logout = function () {
		self.current = "";
		$location.url('/home');
	}

    document.getElementById('note-components').style.visibility = 'hidden';

    self.showMyNotes = function() {
        self.currentNote = "";
        $location.url('/notes');
    }

    self.showOthersNotes = function() {
        self.currentNote = "";
        $location.url('/notes/viewOnly');
    }

    var notesTemp = [];
    notesTemp = JSON.parse(localStorage.getItem('notes'));
    
    if (typeof notesTemp === 'undefined' || !notesTemp) {
        var notes = [];
        localStorage.setItem('notes', JSON.stringify(notes));
    }
    self.myNotes = JSON.parse(localStorage.getItem('notes')).filter(function(element) {
        return element.currentUser == self.current;
    });

    
    
    self.alert = function (currentNote) {
        document.getElementById('temp-msg').innerHTML = currentNote;
        document.getElementById('note-components').style.visibility = 'visible';
        var items = JSON.parse(localStorage.getItem('items'));
        if (typeof items === 'undefined' || !items) {
            var items = [];
            localStorage.setItem('items', JSON.stringify(items));
        }
        self.currentNote = currentNote;
        self.items = JSON.parse(localStorage.getItem('items')).filter(function(element) {
            return element.currentNote == self.currentNote;
        });
    }
    
    self.alertOthers = function (currentNote) {
        self.currentNoteOthers = currentNote;
        self.itemsOthers = JSON.parse(localStorage.getItem('items')).filter(function(element) {
            return element.currentNote == self.currentNoteOthers && !element.private;
        });
    }

    self.addItem = function(todoInput, privacy) {
        document.getElementById('new-todo2').value = "";
        document.getElementById('item-privacy').checked = false;
        var items = [];
        items = JSON.parse(localStorage.getItem('items'));
        if (typeof items === 'undefined' || !items) {
            var items = [];
            localStorage.setItem('items', JSON.stringify(items));
        }

        items.push({ todoText: todoInput, done: false, currentNote: self.currentNote, private: privacy});
        localStorage.setItem('items', JSON.stringify(items));
        self.items = JSON.parse(localStorage.getItem('items')).filter(function(element) {
            return element.currentNote == self.currentNote;
        });

        
    }

    self.save = function() {
        localStorage.setItem('items', JSON.stringify(self.items));
        self.currentNote = "";
        document.getElementById('note-components').style.visibility = 'hidden';
        document.getElementById('temp-msg').innerHTML = 'Select a note from the panel on the left';
        //$location.url('/notes');
    }

    self.removeItem = function(index) {
        var items = [];
        items = JSON.parse(localStorage.getItem('items'));
        items.splice(index, 1);
        localStorage.setItem('items', JSON.stringify(items));
        self.items = JSON.parse(localStorage.getItem('items')).filter(function(element) {
            return element.currentNote == self.currentNote;
        });
    }
	
});