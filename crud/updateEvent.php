<?php

	require_once('connect.php');

	$sth = $dbh->prepare("UPDATE events SET title = ?, events.date = ?, description = ?, color = ? WHERE id = ?");
	$sth->execute(array($_POST['title'], 
			$_POST['date'], 
			$_POST['description'], 
			$_POST['color'], 
			$_POST['id'])
		);
	
