import express from 'express';
import cors from 'cors';
const app = express();

app.get('/main', (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.json([
		{ id: '81766', section: 'barki', date: '1.01.2022', timeStart: '13:00', timeEnd: '14:45', duration: '1h 45m' },
		{ id: '18183', section: 'plecy', date: '3.01.2022', timeStart: '11:20', timeEnd: '13:15', duration: '1h 55m' },
		{ id: '88645', section: 'klata', date: '6.01.2022', timeStart: '12:00', timeEnd: '13:11', duration: '1h 11m' },
		{ id: '8593', section: 'barki', date: '7.01.2022', timeStart: '14:40', timeEnd: '16:00', duration: '1h 20m' },
		{ id: '69595', section: 'nogi', date: '8.01.2022', timeStart: '12:20', timeEnd: '13:35', duration: '1h 15m' },
		{ id: '59496', section: 'klata', date: '9.01.2022', timeStart: '11:35', timeEnd: '12:45', duration: '1h 10m' },
		{ id: '18005', section: 'barki', date: '10.01.2022', timeStart: '12:25', timeEnd: '13:40', duration: '1h 15m' },
		{ id: '72082', section: 'nogi', date: '14.01.2022', timeStart: '15:10', timeEnd: '16:45', duration: '1h 35m' },
		{ id: '59588', section: 'plecy', date: '15.01.2022', timeStart: '11:30', timeEnd: '13:20', duration: '1h 50m' },
		{ id: '59519', section: 'klata', date: '16.01.2022', timeStart: '11:40', timeEnd: '13:40', duration: '2h 0m' },
		{ id: '13987', section: 'barki', date: '17.01.2022', timeStart: '14:00', timeEnd: '15:35', duration: '1h 35m' },
		{ id: '44762', section: 'klata', date: '21.01.2022', timeStart: '10:33', timeEnd: '12:50', duration: '2h 17m' },
		{ id: '39166', section: 'nogi', date: '22.01.2022', timeStart: '12:30', timeEnd: '13:40', duration: '1h 10m' },
		{ id: '41104', section: 'plecy', date: '23.01.2022', timeStart: '11:05', timeEnd: '12:40', duration: '1h 35m' },
		{ id: '87288', section: 'barki', date: '25.01.2022', timeStart: '11:40', timeEnd: '13:20', duration: '1h 40m' },
		{ id: '47811', section: 'ramiona', date: '26.01.2022', timeStart: '12:10', timeEnd: '13:50', duration: '1h 40m' },
		{ id: '66564', section: 'klata', date: '27.01.2022', timeStart: '11:45', timeEnd: '13:20', duration: '1h 35m' },
		{ id: '69176', section: 'barki', date: '29.01.2022', timeStart: '12:40', timeEnd: '14:15', duration: '1h 35m' },
		{ id: '97856', section: 'plecy', date: '30.01.2022', timeStart: '12:15', timeEnd: '13:35', duration: '1h 20m' },
		{ id: '64182', section: 'nogi', date: '1.02.2022', timeStart: '11:45', timeEnd: '13:35', duration: '1h 50m' },
		{ id: '1473', section: 'klata', date: '2.02.2022', timeStart: '11:55', timeEnd: '13:50', duration: '1h 55m' },
		{ id: '63024', section: 'barki', date: '4.02.2022', timeStart: '11:35', timeEnd: '13:25', duration: '1h 50m' },
		{ id: '37868', section: 'ramiona', date: '5.02.2022', timeStart: '11:25', timeEnd: '13:00', duration: '1h 35m' },
		{ id: '56157', section: 'plecy', date: '7.02.2022', timeStart: '11:15', timeEnd: '12:50', duration: '1h 35m' },
		{ id: '5039', section: 'klata', date: '10.02.2022', timeStart: '14:45', timeEnd: '15:50', duration: '1h 5m' },
		{ id: '31861', section: 'barki', date: '11.02.2022', timeStart: '11:55', timeEnd: '13:55', duration: '2h 0m' },
		{ id: '34583', section: 'plecy', date: '12.02.2022', timeStart: '12:05', timeEnd: '13:10', duration: '1h 5m' },
		{ id: '77443', section: 'klata', date: '14.02.2022', timeStart: '14:35', timeEnd: '15:50', duration: '1h 15m' },
		{ id: '15617', section: 'barki', date: '17.02.2022', timeStart: '12:10', timeEnd: '13:45', duration: '1h 35m' },
		{ id: '57945', section: 'nogi', date: '18.02.2022', timeStart: '11:35', timeEnd: '13:20', duration: '1h 45m' },
		{ id: '91490', section: 'plecy', date: '20.02.2022', timeStart: '11:00', timeEnd: '12:35', duration: '1h 35m' },
		{ id: '88099', section: 'plecy', date: '21.02.2022', timeStart: '15:35', timeEnd: '17:10', duration: '1h 35m' },
		{ id: '29199', section: 'klata', date: '25.02.2022', timeStart: '15:10', timeEnd: '17:05', duration: '1h 55m' },
		{ id: '4376', section: 'barki', date: '26.02.2022', timeStart: '9:15', timeEnd: '11:10', duration: '1h 55m' },
		{ id: '29302', section: 'nogi', date: '3.03.2022', timeStart: '15:05', timeEnd: '16:50', duration: '1h 45m' },
		{ id: '63139', section: 'plecy', date: '4.03.2022', timeStart: '13:25', timeEnd: '15:10', duration: '1h 45m' },
		{ id: '68303', section: 'klata', date: '5.03.2022', timeStart: '11:45', timeEnd: '12:55', duration: '1h 10m' },
		{ id: '29956', section: 'barki', date: '6.03.2022', timeStart: '11:45', timeEnd: '13:10', duration: '1h 25m' },
		{ id: '47058', section: 'barki', date: '10.03.2022', timeStart: '15:05', timeEnd: '16:55', duration: '1h 50m' },
		{ id: '72174', section: 'plecy', date: '11.03.2022', timeStart: '13:20', timeEnd: '15:15', duration: '1h 55m' },
		{ id: '30366', section: 'klata', date: '12.03.2022', timeStart: '12:05', timeEnd: '13:25', duration: '1h 20m' },
		{ id: '37756', section: 'barki', date: '13.03.2022', timeStart: '10:40', timeEnd: '11:50', duration: '1h 10m' },
		{ id: '44427', section: 'plecy', date: '14.03.2022', timeStart: '15:15', timeEnd: '16:25', duration: '1h 10m' },
		{ id: '94167', section: 'nogi', date: '17.03.2022', timeStart: '15:15', timeEnd: '16:35', duration: '1h 20m' },
		{ id: '23122', section: 'klata', date: '18.03.2022', timeStart: '14:05', timeEnd: '16:15', duration: '2h 10m' },
		{ id: '48003', section: 'barki', date: '19.03.2022', timeStart: '11:25', timeEnd: '13:10', duration: '1h 45m' },
		{ id: '29820', section: 'barki', date: '21.03.2022', timeStart: '15:15', timeEnd: '16:40', duration: '1h 25m' },
		{ id: '88252', section: 'plecy', date: '23.03.2022', timeStart: '10:05', timeEnd: '12:05', duration: '2h 0m' },
		{ id: '67030', section: 'nogi', date: '24.03.2022', timeStart: '16:05', timeEnd: '17:40', duration: '1h 35m' },
		{ id: '74028', section: 'barki', date: '26.03.2022', timeStart: '10:40', timeEnd: '12:25', duration: '1h 45m' },
		{ id: '19978', section: 'klata', date: '28.03.2022', timeStart: '15:25', timeEnd: '16:40', duration: '1h 15m' },
		{ id: '28824', section: 'plecy', date: '31.03.2022', timeStart: '14:10', timeEnd: '15:40', duration: '1h 30m' },
		{ id: '37276', section: 'nogi', date: '1.04.2022', timeStart: '13:15', timeEnd: '15:10', duration: '1h 55m' },
		{ id: '93397', section: 'barki', date: '2.04.2022', timeStart: '12:15', timeEnd: '13:20', duration: '1h 5m' },
		{ id: '64895', section: 'klata', date: '4.04.2022', timeStart: '15:05', timeEnd: '16:40', duration: '1h 35m' },
		{ id: '57188', section: 'plecy', date: '7.04.2022', timeStart: '13:35', timeEnd: '15:20', duration: '1h 45m' },
		{ id: '56335', section: 'nogi', date: '8.04.2022', timeStart: '14:30', timeEnd: '16:00', duration: '1h 30m' },
		{ id: '58700', section: 'barki', date: '9.04.2022', timeStart: '12:05', timeEnd: '13:30', duration: '1h 25m' },
		{ id: '47272', section: 'klata', date: '11.04.2022', timeStart: '15:15', timeEnd: '16:50', duration: '1h 35m' }
	]);
});

const PORT = 5000;
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
