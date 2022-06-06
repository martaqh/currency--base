import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

  describe('Component ResultBox', () => {
    it('should render without crashing', () => {
        render(<ResultBox from="PLN" to="USD" amount={100} />);
    });

    it('should render proper info about conversion when PLN -> USD', () => {
        const testCases = [
            {amountPLN: '11', amountUSD: '3.14'},
            {amountPLN: '300', amountUSD: '85.71'},
            {amountPLN: '555', amountUSD: '158.57'},
        ];
        for (const testObj of testCases) {
            
            render(<ResultBox from="PLN" to="USD" amount={parseInt(testObj.amountPLN)} />);
            const resultDiv = screen.getByTestId('result');
            expect(resultDiv).toHaveTextContent('PLN ' + testObj.amountPLN + '.00 = $' + testObj.amountUSD);

            cleanup();
        } 
    });

    it('should render proper info about conversion when USD -> PLN', () => {
        const testCases = [
            {amountUSD: '11', amountPLN: '38.5'},
            {amountUSD: '300', amountPLN: '1,050.00'},
            {amountUSD: '555', amountPLN: '1,942.50'},
        ];
        for (const testObj of testCases) {
            
            render(<ResultBox from="USD" to="PLN" amount={parseInt(testObj.amountUSD)} />);
            const resultDiv = screen.getByTestId('result');
            expect(resultDiv).toHaveTextContent('$' + testObj.amountUSD + '.00 = PLN ' + testObj.amountPLN);

            cleanup();
        } 
    });
    it('should render same value if from and to are equal', () => {
        const testCases = [
            {amountUSD: '11', amountPLN: '38.5'},
            {amountUSD: '300', amountPLN: '1,050.00'},
            {amountUSD: '555', amountPLN: '1,942.50'},
        ];
        for (const testObj of testCases) {
            
            render(<ResultBox from="USD" to="USD" amount={parseInt(testObj.amountUSD)} />);
            const resultDiv = screen.getByTestId('result');
            expect(resultDiv).toHaveTextContent('$' + testObj.amountUSD + '.00 = $' + testObj.amountUSD);

            cleanup();
        } 
    });
    it('should render "Wrong value..." string when given value < 0', () => {
        const testCases = [
            {amountUSD: '-11', amountPLN: '38.5'},
            {amountUSD: '-300', amountPLN: '1,050.00'},
            {amountUSD: '-555', amountPLN: '1,942.50'},
        ];
        for (const testObj of testCases) {
            
            render(<ResultBox from="USD" to="PLN" amount={parseInt(testObj.amountUSD)} />);
            const resultDiv = screen.getByTestId('result');
            expect(resultDiv).toHaveTextContent('Wrong value...');

            cleanup();
        } 
    });
});