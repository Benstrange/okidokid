function ContactListView(dic) {
	
	var ContactController = require('lib/controller/ContactController');
	var controller = new ContactController(dic);
	
	var self = Ti.UI.createView({
		backgroundImage: '/images/bg.png',
		layout:'vertical',
		top: 67
	});
	
	var title_label = Ti.UI.createLabel({
		text: 'Mes contacts'
	});
	
	var add_contact = Ti.UI.createView({
		backgroundImage: '/images/bg_btn_ajouter.png',
		height: 27
	});
	
	var add_contact_image = Ti.UI.createImageView({
		url: '/images/ico_addlocation_w.png',
		width: 10, height: 10
	});
	
	var add_contact_label = Ti.UI.createLabel({
		text:'Ajouter un contact'
	});
	
	add_contact.add(add_contact_image);
	add_contact.add(add_contact_label);
	
	self.add(title_label);
	self.add(add_contact);
	
	var sectionWaiting = Ti.UI.createTableViewSection({ headerTitle: 'En attente' });
	
	var sectionAdd = Ti.UI.createTableViewSection({ headerTitle: 'Ajoutés' });
	
	var tableView = Ti.UI.createTableView({
      data: [sectionWaiting, sectionAdd],
      backgroundColor:'white'
    });
	
	
    self.add(tableView);
	
    add_contact.addEventListener('click', function(e) {
		var ContactSearchWindow = require('ui/contact/ContactSearchWindow');
    	new ContactSearchWindow(dic).open();
	});
	
	Ti.App.addEventListener("waitingContactsReturn", function(e) {
		
		for (var i = 0; i < e.contacts.length; i++) {
        	
        	var contact = e.contacts[i];
            var row = Ti.UI.createTableViewRow({
        		className:'contact', // used to improve table performance
		        backgroundImage:'/images/logo-okidokid.png',
		        rowIndex:i, // custom property, useful for determining the row during events
		        height:110
	      	});
	      	
	      	var labelUserName = Ti.UI.createLabel({
		        color:'#576996',
		        font:{fontFamily:'Arial', fontSize:26, fontWeight:'bold'},
		        text:'nom:'+contact.username,
		        left:70, top: 6,
		        width:200, height: 30
		      });
		      row.add(labelUserName);
		      
		      sectionWaiting.add(row);
		      
	 	}
		tableView.setData([sectionWaiting, sectionAdd]); 
	});
	controller.getWaitingContacts();
	
	return self;
}

module.exports = ContactListView;