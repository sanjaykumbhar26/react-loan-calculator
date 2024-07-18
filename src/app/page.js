import Image from "next/image";
import styles from "./page.module.css";
import LoanCalculator from "@component/components/LoanCalculator";
export default function Home() {
  const labels = {
    principalLabel: 'Principal Amount',
    interestLabel: 'Interest Amount',
    monthlyEmiLabel: 'Monthly EMI:',
    totalInterestLabel: 'Total Interest:',
    totalAmountLabel: 'Total Amount:',
    loanAmountLabel: 'Loan Amount',
    interestRateLabel: 'Rate of Interest (%)',
    loanTenureLabel: 'Loan Tenure',
    applyNowLabel: 'Apply Now'
  };
  return (
    <main >
      <LoanCalculator labels={labels} />
    </main>
  );
}
