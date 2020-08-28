<?php

	require_once('connect.php');

	$sth = $dbh->prepare("SELECT * FROM events WHERE events.date BETWEEN ? AND ? ORDER BY events.date ASC");
	$sth->execute(array($_GET['start'], $_GET['end']));
	$result = $sth->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($result);
