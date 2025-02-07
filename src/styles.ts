import styled from 'styled-components/native';

export const Universe = styled.View`
  flex: 1;
  background-color: #000;
  display: flex;
  justify-content: space-between;
`;

export const Space = styled.View`
  flex: 1;
  background-color: #000;
  display: flex;
  justify-content: center;
`;

export const PlanetsName = styled.Text`
  color: #fff;
  font-size: 24px;
  margin-top: 20px;
  text-align: center;
  font-family: Goldman-Bold;
  letter-spacing: 2;
`;

export const HandShake = styled.View`
  position: relative;
  left: 20px;
`;

export const ArrowDown = styled.View`
  position: absolute;
  bottom: 0PX;
  left: 35PX;
`;

export const ArrowUp = styled.View`
  position: absolute;
  bottom: 100px;
  left: 35px;
`;

export const RocketShipButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 20px;
  right: 20px;
`;
