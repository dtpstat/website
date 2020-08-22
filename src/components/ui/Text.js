import styled from '@emotion/styled';

const Text = styled.div`
    font-family: Roboto;
    font-style: normal;
    color: ${(props) => props.color ?? '#c4c4c4'};
`;

export const Subtitle1 = styled(Text)`
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.15px;
`;

export const Subtitle2 = styled(Text)`
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.15px;
`;

export const Subtitle3 = styled(Text)`
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
`;

export const Caption = styled(Text)`
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.15px;
`;

export const Body1 = styled(Text)`
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
`;

export const Body2 = styled(Text)`
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.15px;
`;

export const Body3 = styled(Text)`
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
`;

export const BodySerif = styled(Text)`
    font-family: Merriweather;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 28px;
`;

export const Header1 = styled(Text)`
    font-weight: bold;
    font-size: 30px;
    line-height: 48px;
`;

export const Header2 = styled(Text)`
    font-weight: bold;
    font-size: 26px;
    line-height: 40px;
`;

export const Header3 = styled(Text)`
    font-weight: bold;
    font-size: 20px;
    line-height: 28px;
`;
