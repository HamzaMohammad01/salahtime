import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import PrayerTime from "../components/PrayerTime";
import Navbar from "../components/Navbar";
import MyFooter from "../components/MyFooter";
import { getSalah } from "../api/prayertime";
import _ from "underscore";

export default function Home() {
	const [data, setData] = useState();
	useEffect(() => {
		getPrayerTime();
	}, []);
	const getPrayerTime = async () => {
		const response = await getSalah();
		setData(response.data[0]);
	};

	return data ? (
		<>
			<Navbar />
			<Title icon />
			<div className="w-full p-5 space-y-5 block">
				{Object.entries(
					_.pick(data, [
						"fajr",
						"zuhr",
						"asr",
						"maghrib",
						"isha",
						"juma",
					])
				).map(([prayerName, prayerTime]) => (
					<PrayerTime
						key={prayerName}
						name={prayerName}
						time={prayerTime}
						cb={getPrayerTime}
					/>
				))}
			</div>
			<MyFooter />
		</>
	) : (
		<span className="loading loading-dots loading-lg"></span>
	);
}