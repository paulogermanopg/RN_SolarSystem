import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  PanResponder,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {Canvas, Circle, Path, Skia} from '@shopify/react-native-skia';
import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
  useDerivedValue,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';

const planets = [
  {
    id: 0,
    name: 'Mercury',
    color: '#B0B0B0',
    radius: 5,
    orbitRadius: 40,
    speed: 1920,
  },
  {
    id: 1,
    name: 'Venus',
    color: '#F5A623',
    radius: 8,
    orbitRadius: 70,
    speed: 4960,
  },
  {
    id: 2,
    name: 'Earth',
    color: '#2A76D2',
    radius: 10,
    orbitRadius: 100,
    speed: 8000,
  },
  {
    id: 3,
    name: 'Mars',
    color: '#D14A3B',
    radius: 7,
    orbitRadius: 130,
    speed: 15040,
  },
  {
    id: 4,
    name: 'Jupiter',
    color: '#E0C084',
    radius: 15,
    orbitRadius: 170,
    speed: 94880,
  },
  {
    id: 5,
    name: 'Saturn',
    color: '#D3B376',
    radius: 12,
    orbitRadius: 210,
    speed: 235680,
  },
  {
    id: 6,
    name: 'Uranus',
    color: '#8BCFE7',
    radius: 10,
    orbitRadius: 250,
    speed: 672080,
  },
  {
    id: 7,
    name: 'Neptune',
    color: '#4A80B5',
    radius: 10,
    orbitRadius: 290,
    speed: 1318400,
  },
];

const SolarSystem = () => {
  const [zoom, setZoom] = useState<number>(1);
  const [selectedPlanetIndex, setSelectedPlanetIndex] = useState<number>(0);
  const handPositionY = useSharedValue<number>(25);
  const selectedGlow = useSharedValue<number>(1);

  const mercuryRotation = useSharedValue<number>(0);
  const venusRotation = useSharedValue<number>(0);
  const earthRotation = useSharedValue<number>(0);
  const marsRotation = useSharedValue<number>(0);
  const jupiterRotation = useSharedValue<number>(0);
  const saturnRotation = useSharedValue<number>(0);
  const uranusRotation = useSharedValue<number>(0);
  const neptuneRotation = useSharedValue<number>(0);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetResponder: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderMove: (event, gestureState) => {
          if (gestureState.dy < 0) {
            setZoom(prevZoom => Math.min(prevZoom + 0.02, 2));
          } else {
            setZoom(prevZoom => Math.max(prevZoom - 0.02, 0.5));
          }
        },
      }),
    [],
  );

  const rotations = useMemo(
    () => [
      mercuryRotation,
      venusRotation,
      earthRotation,
      marsRotation,
      jupiterRotation,
      saturnRotation,
      uranusRotation,
      neptuneRotation,
    ],
    [
      mercuryRotation,
      venusRotation,
      earthRotation,
      marsRotation,
      jupiterRotation,
      saturnRotation,
      uranusRotation,
      neptuneRotation,
    ],
  );

  const selectNextPlanet = () => {
    setSelectedPlanetIndex(prevIndex => (prevIndex + 1) % planets.length);
  };

  useEffect(() => {
    selectedGlow.value = withRepeat(
      withTiming(1.5, {duration: 500, easing: Easing.linear}),
      -1,
      true,
    );
  }, []);

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

  useEffect(() => {
    handPositionY.value = withRepeat(
      withTiming(50, {duration: 1500, easing: Easing.inOut(Easing.sin)}),
      -1,
      true,
    );
  }, []);

  // const getAnimatedStyle = (planetId: number) => {
  //   return useAnimatedStyle(() => {
  //     return {
  //       opacity: selectedPlanetIndex === planetId ? selectedGlow.value : 1,
  //     };
  //   });
  // };

  const handStyle = useAnimatedStyle(() => ({
    bottom: handPositionY.value,
  }));

  //Mercurio
  const mercuryAngle = useDerivedValue(
    () => (mercuryRotation.value * Math.PI) / 180,
  );
  const mercuryCx = useDerivedValue(
    () => 200 + planets[0].orbitRadius * zoom * Math.cos(mercuryAngle.value),
  );
  const mercuryCy = useDerivedValue(
    () => 400 + planets[0].orbitRadius * zoom * Math.sin(mercuryAngle.value),
  );

  //Venus
  const venusAngle = useDerivedValue(
    () => (venusRotation.value * Math.PI) / 180,
  );
  const venusCx = useDerivedValue(
    () => 200 + planets[1].orbitRadius * zoom * Math.cos(venusAngle.value),
  );
  const venusCy = useDerivedValue(
    () => 400 + planets[1].orbitRadius * zoom * Math.sin(venusAngle.value),
  );

  //Terra
  const earthAngle = useDerivedValue(
    () => (earthRotation.value * Math.PI) / 180,
  );
  const earthCx = useDerivedValue(
    () => 200 + planets[2].orbitRadius * zoom * Math.cos(earthAngle.value),
  );
  const earthCy = useDerivedValue(
    () => 400 + planets[2].orbitRadius * zoom * Math.sin(earthAngle.value),
  );

  //Marte
  const marsAngle = useDerivedValue(() => (marsRotation.value * Math.PI) / 180);
  const marsCx = useDerivedValue(
    () => 200 + planets[3].orbitRadius * zoom * Math.cos(marsAngle.value),
  );
  const marsCy = useDerivedValue(
    () => 400 + planets[3].orbitRadius * zoom * Math.sin(marsAngle.value),
  );

  //Jupiter
  const jupiterAngle = useDerivedValue(
    () => (jupiterRotation.value * Math.PI) / 180,
  );
  const jupiterCx = useDerivedValue(
    () => 200 + planets[4].orbitRadius * zoom * Math.cos(jupiterAngle.value),
  );
  const jupiterCy = useDerivedValue(
    () => 400 + planets[4].orbitRadius * zoom * Math.sin(jupiterAngle.value),
  );

  //Saturno
  const saturnAngle = useDerivedValue(
    () => (saturnRotation.value * Math.PI) / 180,
  );
  const saturnCx = useDerivedValue(
    () => 200 + planets[5].orbitRadius * zoom * Math.cos(saturnAngle.value),
  );
  const saturnCy = useDerivedValue(
    () => 400 + planets[5].orbitRadius * zoom * Math.sin(saturnAngle.value),
  );

  //Urano
  const uranusAngle = useDerivedValue(
    () => (uranusRotation.value * Math.PI) / 180,
  );
  const uranusCx = useDerivedValue(
    () => 200 + planets[6].orbitRadius * zoom * Math.cos(uranusAngle.value),
  );
  const uranusCy = useDerivedValue(
    () => 400 + planets[6].orbitRadius * zoom * Math.sin(uranusAngle.value),
  );

  //Netuno
  const neptuneAngle = useDerivedValue(
    () => (neptuneRotation.value * Math.PI) / 180,
  );
  const neptuneCx = useDerivedValue(
    () => 200 + planets[7].orbitRadius * zoom * Math.cos(neptuneAngle.value),
  );
  const neptuneCy = useDerivedValue(
    () => 400 + planets[7].orbitRadius * zoom * Math.sin(neptuneAngle.value),
  );

  const planetsCyCx = [
    {cx: mercuryCx, cy: mercuryCy},
    {cx: venusCx, cy: venusCy},
    {cx: earthCx, cy: earthCy},
    {cx: marsCx, cy: marsCy},
    {cx: jupiterCx, cy: jupiterCy},
    {cx: saturnCx, cy: saturnCy},
    {cx: uranusCx, cy: uranusCy},
    {cx: neptuneCx, cy: neptuneCy},
  ];

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <Text
        style={{
          color: 'white',
          fontSize: 24,
          marginTop: 20,
          textAlign: 'center',
        }}>
        {planets[selectedPlanetIndex].name}
      </Text>

      <View
        style={{flex: 1, backgroundColor: 'black'}}
        {...panResponder.panHandlers}>
        <Canvas style={{flex: 1}}>
          <Circle cx={200} cy={400} r={20 * zoom} color="yellow" />

          {planets.map((planet, index) => {
            const orbitPath = Skia.Path.Make();
            orbitPath.addCircle(200, 400, planet.orbitRadius * zoom);

            return (
              <Path
                key={`orbit-${planet.name}`}
                path={orbitPath}
                color="rgba(255, 255, 255, 0.3)"
                style="stroke"
                strokeWidth={1}
              />
            );
          })}

          {planets.map(planet => (
            <Circle
              key={planet.id}
              cx={planetsCyCx[planet.id].cx}
              cy={planetsCyCx[planet.id].cy}
              r={planet.radius}
              color={planet.color}
            />
          ))}
        </Canvas>
      </View>

      <View>
        <View style={{position: 'relative', left: 20}}>
          <Animated.View style={handStyle}>
            <Ionicons name="swap-vertical" size={50} color="white" />
          </Animated.View>
        </View>

        <View style={{position: 'absolute', bottom: 100, left: 35}}>
          <Ionicons name="add" size={30} color="white" />
        </View>
        <View style={{position: 'absolute', bottom: 0, left: 35}}>
          <Ionicons name="remove" size={30} color="white" />
        </View>

        <TouchableOpacity
          style={{position: 'absolute', bottom: 20, right: 20}}
          onPress={selectNextPlanet}>
          <Ionicons name="rocket" size={50} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SolarSystem;
