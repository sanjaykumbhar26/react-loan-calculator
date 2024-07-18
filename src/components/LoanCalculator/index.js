"use client"
import { useState, useEffect, useRef } from 'react';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import styles from './style.module.scss';
import { Col, Container, Row } from "react-bootstrap";

Chart.register(ArcElement, Tooltip, Legend);

const LoanCalculator = ({ labels, defaultTermUnit = 'months' }) => {
    const [principal, setPrincipal] = useState(100000); // Initial principal amount in rupees
    const [interestRate, setInterestRate] = useState(1.0); // Initial interest rate in percentage
    const [term, setTerm] = useState(1); // Initial loan term
    const [termUnit, setTermUnit] = useState(defaultTermUnit); // Initial loan term unit
    const [emi, setEmi] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const chartRef = useRef(null);

    // Function to calculate monthly EMI
    const calculateEMI = (principal, annualRate, months) => {
        const monthlyRate = annualRate / (12 * 100);
        if (monthlyRate === 0) return principal / months; // If interest rate is 0
        return (
            (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
            (Math.pow(1 + monthlyRate, months) - 1)
        );
    };

    useEffect(() => {
        const months = termUnit === 'years' ? term * 12 : term;
        const calculatedEMI = calculateEMI(principal, interestRate, months);
        const calculatedTotalAmount = calculatedEMI * months;
        const calculatedTotalInterest = calculatedTotalAmount - principal;

        setEmi(calculatedEMI);
        setTotalAmount(calculatedTotalAmount);
        setTotalInterest(calculatedTotalInterest);
    }, [principal, interestRate, term, termUnit]);

    useEffect(() => {
        const updateSliders = () => {
            const principalInput = document.querySelector(`.${styles.slider}[name="principal"]`);
            const interestRateInput = document.querySelector(`.${styles.slider}[name="interestRate"]`);
            const termInput = document.querySelector(`.${styles.slider}[name="term"]`);

            if (principalInput) updateSliderBackground({ target: principalInput }, 'principal');
            if (interestRateInput) updateSliderBackground({ target: interestRateInput }, 'interestRate');
            if (termInput) updateSliderBackground({ target: termInput }, 'term');
        };

        updateSliders();
    }, [principal, interestRate, term]);

    // Chart data
    const data = {
        labels: [labels.principalLabel, labels.interestLabel],
        datasets: [
            {
                data: [principal, totalInterest],
                backgroundColor: ['#24256A', '#F47D20'],
                hoverBackgroundColor: ['#24256A', '#F47D20'],
                borderWidth: 0,
                align: 'end',
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    usePointStyle: false,
                    boxWidth: 15,
                    fontSize: 15,
                    fontColor: '#FF5722',
                    padding: 10,
                }
            }
        }
    };

    // Update background of sliders
    const updateSliderBackground = (e, type) => {
        if (!e || !e.target) return;

        const value = e.target.value;
        let percentage = 0;

        if (type === 'principal') {
            percentage = ((value - 100000) / (10000000 - 100000)) * 100;
        } else if (type === 'interestRate') {
            percentage = ((value - 1) / (30 - 1)) * 100;
        } else if (type === 'term') {
            const maxTerm = termUnit === 'years' ? 30 : 360;
            percentage = ((value - 1) / (maxTerm - 1)) * 100;
        }

        if (e.target.style) {
            e.target.style.background = `linear-gradient(to right, #24256A 0%, #24256A ${percentage}%, #D0D5DD ${percentage}%, #D0D5DD 100%)`;
        }
    };

    // Format number to Indian currency style (e.g., 1,00,000)
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN').format(amount);
    };

    // Format number to Indian currency style for display
    const formattedEMI = `₹${formatCurrency(emi.toFixed(2))}`;
    const formattedTotalInterest = `₹${formatCurrency(totalInterest.toFixed(2))}`;
    const formattedTotalAmount = `₹${formatCurrency(totalAmount.toFixed(2))}`;

    return (
        <Container>
            <div className={styles.LoanCalculator}>
                <Row className={styles.LoanRow}>
                    <Col xs={12} lg={4} className={styles.Loanchart}>
                        <div className={styles.sliderMobileBtn}>
                            <button className="primaryBtn">{labels.applyNowLabel}</button>
                        </div>
                        <div className={styles.chart}>
                            <Doughnut data={data} options={options} ref={chartRef} />
                        </div>
                        <div className={styles.result}>
                            <div className={styles.resultItem}>
                                <span className={styles.label}>{labels.monthlyEmiLabel}</span>
                                <span> {formattedEMI}</span>
                            </div>
                            <div className={styles.resultItem}>
                                <span className={styles.label}>{labels.totalInterestLabel}</span>
                                <span> {formattedTotalInterest} </span>
                            </div>
                            <div className={styles.resultItem}>
                                <span className={styles.label}>{labels.totalAmountLabel}</span>
                                <span> {formattedTotalAmount} </span>
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} lg={8}>
                        <div className={styles.details}>
                            <div className={styles.inputGroup}>
                                <div className={styles.fieldGroup}>
                                    <label>{labels.loanAmountLabel}</label>
                                    <input
                                        type="text" // Use text type for formatted input
                                        value={`₹${formatCurrency(principal)}`}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
                                            if (!isNaN(value) && value !== '') {
                                                setPrincipal(Number(value));
                                                updateSliderBackground({ target: { value } }, 'principal');
                                            }
                                        }}
                                    />
                                </div>
                                <div className={styles.sliderContainer}>
                                    <input
                                        type="range"
                                        min="100000"
                                        max="10000000"
                                        step="100000"
                                        value={principal}
                                        name="principal"
                                        onChange={(e) => {
                                            setPrincipal(Number(e.target.value));
                                            updateSliderBackground(e, 'principal');
                                        }}
                                        className={styles.slider} // Apply custom slider class
                                    />
                                </div>
                            </div>
                            <div className={styles.inputGroup}>
                                <div className={styles.fieldGroup}>
                                    <label>{labels.interestRateLabel}</label>
                                    <input
                                        type="text" // Use text type for formatted input
                                        value={`${interestRate.toFixed(2)}%`}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/[^\d.-]/g, ''); // Remove non-numeric characters except decimal
                                            if (!isNaN(value) && value !== '') {
                                                setInterestRate(Number(value));
                                                updateSliderBackground({ target: { value } }, 'interestRate');
                                            }
                                        }}
                                    />
                                </div>
                                <div className={styles.sliderContainer}>
                                    <input
                                        type="range"
                                        min="1"
                                        max="30"
                                        step="0.01" // Allow steps of 0.01
                                        value={interestRate}
                                        name="interestRate"
                                        onChange={(e) => {
                                            setInterestRate(Number(e.target.value));
                                            updateSliderBackground(e, 'interestRate');
                                        }}
                                        className={styles.slider} // Apply custom slider class
                                    />
                                </div>
                            </div>
                            <div className={styles.inputGroup}>
                                <div className={styles.fieldGroup}>
                                    <label>{labels.loanTenureLabel} ({termUnit})</label>
                                    <input
                                        type="text" // Use text type for formatted input
                                        value={`${term} ${termUnit === 'years' ? (term > 1 ? 'Years' : 'Year') : (term > 1 ? 'Months' : 'Month')}`}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
                                            if (!isNaN(value) && value !== '') {
                                                setTerm(Number(value));
                                                updateSliderBackground({ target: { value } }, 'term');
                                            }
                                        }}
                                    />
                                </div>
                                <div className={styles.sliderContainer}>
                                    <input
                                        type="range"
                                        min="1"
                                        max={termUnit === 'years' ? "30" : "360"}
                                        step="1"
                                        value={term}
                                        name="term"
                                        onChange={(e) => {
                                            setTerm(Number(e.target.value));
                                            updateSliderBackground(e, 'term');
                                        }}
                                        className={styles.slider} // Apply custom slider class
                                    />
                                </div>
                            </div>
                            <div className={styles.toggleUnit}>
                                <button
                                    className={`primaryBtn ${termUnit === 'months' ? styles.active : ''}`}
                                    onClick={() => setTermUnit('months')}
                                >
                                    Months
                                </button>
                                <button
                                    className={`primaryBtn ${termUnit === 'years' ? styles.active : ''}`}
                                    onClick={() => setTermUnit('years')}
                                >
                                    Years
                                </button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
    );
};

export default LoanCalculator;