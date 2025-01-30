import React, {useEffect, useMemo} from 'react';
import {View} from 'react-native';
import {Canvas, Circle} from '@shopify/react-native-skia';
import {
  useSharedValue,
  withRepeat,
  withTiming,
  useDerivedValue,
  Easing,
} from 'react-native-reanimated';

const planets = [
  {name: 'Mercury', color: '#B0B0B0', radius: 5, orbitRadius: 40, speed: 4000},
  {name: 'Venus', color: '#F5A623', radius: 8, orbitRadius: 70, speed: 6000},
  {name: 'Earth', color: '#2A76D2', radius: 10, orbitRadius: 100, speed: 8000},
  {name: 'Mars', color: '#D14A3B', radius: 7, orbitRadius: 130, speed: 10000},
  {
    name: 'Jupiter',
    color: '#E0C084',
    radius: 15,
    orbitRadius: 170,
    speed: 14000,
  },
  {
    name: 'Saturn',
    color: '#D3B376',
    radius: 12,
    orbitRadius: 210,
    speed: 18000,
  },
  {
    name: 'Uranus',
    color: '#8BCFE7',
    radius: 10,
    orbitRadius: 250,
    speed: 22000,
  },
  {
    name: 'Neptune',
    color: '#4A80B5',
    radius: 10,
    orbitRadius: 290,
    speed: 26000,
  },
];

const SolarSystem = () => {
  const mercuryRotation = useSharedValue(0);
  const venusRotation = useSharedValue(0);
  const earthRotation = useSharedValue(0);
  const marsRotation = useSharedValue(0);
  const jupiterRotation = useSharedValue(0);
  const saturnRotation = useSharedValue(0);
  const uranusRotation = useSharedValue(0);
  const neptuneRotation = useSharedValue(0);

  const rotations = useMemo(() => [
    mercuryRotation,
    venusRotation,
    earthRotation,
    marsRotation,
    jupiterRotation,
    saturnRotation,
    uranusRotation,
    neptuneRotation,
  ], [
    mercuryRotation,
    venusRotation,
    earthRotation,
    marsRotation,
    jupiterRotation,
    saturnRotation,
    uranusRotation,
    neptuneRotation,
  ]);

  useEffect(() => {
    rotations.forEach((rotation, index) => {
      rotation.value = withRepeat(
        withTiming(360, {
          duration: planets[index].speed,
          easing: Easing.linear,
        }),
        -1,
        false,
      );
    });
  }, [rotations]);

  const mercuryAngle = useDerivedValue(() => (mercuryRotation.value * Math.PI) / 180);
  const mercuryCx = useDerivedValue(() => 200 + planets[0].orbitRadius * Math.cos(mercuryAngle.value));
  const mercuryCy = useDerivedValue(() => 400 + planets[0].orbitRadius * Math.sin(mercuryAngle.value));

  const venusAngle = useDerivedValue(() => (venusRotation.value * Math.PI) / 180);
  const venusCx = useDerivedValue(() => 200 + planets[1].orbitRadius * Math.cos(venusAngle.value));
  const venusCy = useDerivedValue(() => 400 + planets[1].orbitRadius * Math.sin(venusAngle.value));

  const earthAngle = useDerivedValue(() => (earthRotation.value * Math.PI) / 180);
  const earthCx = useDerivedValue(() => 200 + planets[2].orbitRadius * Math.cos(earthAngle.value));
  const earthCy = useDerivedValue(() => 400 + planets[2].orbitRadius * Math.sin(earthAngle.value));

  const marsAngle = useDerivedValue(() => (marsRotation.value * Math.PI) / 180);
  const marsCx = useDerivedValue(() => 200 + planets[3].orbitRadius * Math.cos(marsAngle.value));
  const marsCy = useDerivedValue(() => 400 + planets[3].orbitRadius * Math.sin(marsAngle.value));

  const jupiterAngle = useDerivedValue(() => (jupiterRotation.value * Math.PI) / 180);
  const jupiterCx = useDerivedValue(() => 200 + planets[4].orbitRadius * Math.cos(jupiterAngle.value));
  const jupiterCy = useDerivedValue(() => 400 + planets[4].orbitRadius * Math.sin(jupiterAngle.value));

  const saturnAngle = useDerivedValue(() => (saturnRotation.value * Math.PI) / 180);
  const saturnCx = useDerivedValue(() => 200 + planets[5].orbitRadius * Math.cos(saturnAngle.value));
  const saturnCy = useDerivedValue(() => 400 + planets[5].orbitRadius * Math.sin(saturnAngle.value));

  const uranusAngle = useDerivedValue(() => (uranusRotation.value * Math.PI) / 180);
  const uranusCx = useDerivedValue(() => 200 + planets[6].orbitRadius * Math.cos(uranusAngle.value));
  const uranusCy = useDerivedValue(() => 400 + planets[6].orbitRadius * Math.sin(uranusAngle.value));

  const neptuneAngle = useDerivedValue(() => (neptuneRotation.value * Math.PI) / 180);
  const neptuneCx = useDerivedValue(() => 200 + planets[7].orbitRadius * Math.cos(neptuneAngle.value));
  const neptuneCy = useDerivedValue(() => 400 + planets[7].orbitRadius * Math.sin(neptuneAngle.value));

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <Canvas style={{flex: 1}}>
        <Circle cx={200} cy={400} r={20} color="yellow" />

        <Circle key="Mercury" cx={mercuryCx} cy={mercuryCy} r={planets[0].radius} color={planets[0].color} />
        <Circle key="Venus" cx={venusCx} cy={venusCy} r={planets[1].radius} color={planets[1].color} />
        <Circle key="Earth" cx={earthCx} cy={earthCy} r={planets[2].radius} color={planets[2].color} />
        <Circle key="Mars" cx={marsCx} cy={marsCy} r={planets[3].radius} color={planets[3].color} />
        <Circle key="Jupiter" cx={jupiterCx} cy={jupiterCy} r={planets[4].radius} color={planets[4].color} />
        <Circle key="Saturn" cx={saturnCx} cy={saturnCy} r={planets[5].radius} color={planets[5].color} />
        <Circle key="Uranus" cx={uranusCx} cy={uranusCy} r={planets[6].radius} color={planets[6].color} />
        <Circle key="Neptune" cx={neptuneCx} cy={neptuneCy} r={planets[7].radius} color={planets[7].color} />
      </Canvas>
    </View>
  );
};

export default SolarSystem;
