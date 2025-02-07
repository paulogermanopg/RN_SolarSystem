import React, {useEffect, useMemo, useState} from 'react';
import {View, PanResponder, StyleSheet, Dimensions} from 'react-native';
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
import {planets} from './data/planets';
import * as S from './styles';

const SolarSystem = () => {
  const {width, height} = Dimensions.get('window');
  const centerX = width / 2;
  const centerY = height / 2 - 50;

  const [zoom, setZoom] = useState<number>(1);
  const [selectedPlanetIndex, setSelectedPlanetIndex] = useState<number>(0);
  const handPositionY = useSharedValue<number>(25);

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
        onMoveShouldSetPanResponder: () => true,
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

  const handStyle = useAnimatedStyle(() => ({
    bottom: handPositionY.value,
  }));

  //Mercurio
  const mercuryAngle = useDerivedValue(
    () => (mercuryRotation.value * Math.PI) / 180,
  );
  const mercuryCx = useDerivedValue(
    () =>
      centerX + planets[0].orbitRadius * zoom * Math.cos(mercuryAngle.value),
  );
  const mercuryCy = useDerivedValue(
    () =>
      centerY + planets[0].orbitRadius * zoom * Math.sin(mercuryAngle.value),
  );

  //Venus
  const venusAngle = useDerivedValue(
    () => (venusRotation.value * Math.PI) / 180,
  );
  const venusCx = useDerivedValue(
    () => centerX + planets[1].orbitRadius * zoom * Math.cos(venusAngle.value),
  );
  const venusCy = useDerivedValue(
    () => centerY + planets[1].orbitRadius * zoom * Math.sin(venusAngle.value),
  );

  //Terra
  const earthAngle = useDerivedValue(
    () => (earthRotation.value * Math.PI) / 180,
  );
  const earthCx = useDerivedValue(
    () => centerX + planets[2].orbitRadius * zoom * Math.cos(earthAngle.value),
  );
  const earthCy = useDerivedValue(
    () => centerY + planets[2].orbitRadius * zoom * Math.sin(earthAngle.value),
  );

  //Marte
  const marsAngle = useDerivedValue(() => (marsRotation.value * Math.PI) / 180);
  const marsCx = useDerivedValue(
    () => centerX + planets[3].orbitRadius * zoom * Math.cos(marsAngle.value),
  );
  const marsCy = useDerivedValue(
    () => centerY + planets[3].orbitRadius * zoom * Math.sin(marsAngle.value),
  );

  //Jupiter
  const jupiterAngle = useDerivedValue(
    () => (jupiterRotation.value * Math.PI) / 180,
  );
  const jupiterCx = useDerivedValue(
    () =>
      centerX + planets[4].orbitRadius * zoom * Math.cos(jupiterAngle.value),
  );
  const jupiterCy = useDerivedValue(
    () =>
      centerY + planets[4].orbitRadius * zoom * Math.sin(jupiterAngle.value),
  );

  //Saturno
  const saturnAngle = useDerivedValue(
    () => (saturnRotation.value * Math.PI) / 180,
  );
  const saturnCx = useDerivedValue(
    () => centerX + planets[5].orbitRadius * zoom * Math.cos(saturnAngle.value),
  );
  const saturnCy = useDerivedValue(
    () => centerY + planets[5].orbitRadius * zoom * Math.sin(saturnAngle.value),
  );

  //Urano
  const uranusAngle = useDerivedValue(
    () => (uranusRotation.value * Math.PI) / 180,
  );
  const uranusCx = useDerivedValue(
    () => centerX + planets[6].orbitRadius * zoom * Math.cos(uranusAngle.value),
  );
  const uranusCy = useDerivedValue(
    () => centerY + planets[6].orbitRadius * zoom * Math.sin(uranusAngle.value),
  );

  //Netuno
  const neptuneAngle = useDerivedValue(
    () => (neptuneRotation.value * Math.PI) / 180,
  );
  const neptuneCx = useDerivedValue(
    () =>
      centerX + planets[7].orbitRadius * zoom * Math.cos(neptuneAngle.value),
  );
  const neptuneCy = useDerivedValue(
    () =>
      centerY + planets[7].orbitRadius * zoom * Math.sin(neptuneAngle.value),
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
  }, [handPositionY]);

  return (
    <S.Universe>
      <S.PlanetsName>{planets[selectedPlanetIndex].name}</S.PlanetsName>

      <S.Space {...panResponder.panHandlers}>
        <Canvas style={styles.canva}>
          <Circle cx={centerX} cy={centerY} r={20 * zoom} color="yellow" />

          {planets.map((planet, _) => {
            const orbitPath = Skia.Path.Make();
            orbitPath.addCircle(centerX, centerY, planet.orbitRadius * zoom);

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

          {planets.map((planet, index) => (
            <View key={planet.id}>
              {index === selectedPlanetIndex && (
                <Circle
                  cx={planetsCyCx[index].cx}
                  cy={planetsCyCx[index].cy}
                  r={planet.radius + 5}
                  color="white"
                />
              )}
              <Circle
                key={planet.id}
                cx={planetsCyCx[index].cx}
                cy={planetsCyCx[index].cy}
                r={planet.radius}
                color={planet.color}
              />
            </View>
          ))}
        </Canvas>
      </S.Space>

      <View>
        <S.HandShake>
          <Animated.View style={handStyle}>
            <Ionicons name="swap-vertical" size={50} color="white" />
          </Animated.View>
        </S.HandShake>

        <S.ArrowUp>
          <Ionicons name="add" size={30} color="white" />
        </S.ArrowUp>

        <S.ArrowDown>
          <Ionicons name="remove" size={30} color="white" />
        </S.ArrowDown>

        <S.RocketShipButton onPress={selectNextPlanet}>
          <Ionicons name="rocket" size={50} color="white" />
        </S.RocketShipButton>
      </View>
    </S.Universe>
  );
};

const styles = StyleSheet.create({
  canva: {
    flex: 1,
  },
});

export default SolarSystem;
