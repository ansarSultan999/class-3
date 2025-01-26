import LoanRequest from "../models/loanRequest.js";

const loanCategories = {
  wedding: {
    subcategories: ["Valima", "Furniture", "Valima Food", "Jahez"],
    maxLoan: 500000,
    loanPeriod: 3,
  },
  homeConstruction: {
    subcategories: ["Structure", "Finishing", "Loan"],
    maxLoan: 1000000,
    loanPeriod: 5,
  },
  businessStartup: {
    subcategories: ["Buy Stall", "Advance Rent for Shop", "Shop Assets", "Shop Machinery"],
    maxLoan: 1000000,
    loanPeriod: 5,
  },
  education: {
    subcategories: ["University Fees", "Child Fees"],
    maxLoan: "Based on requirement",
    loanPeriod: 4,
  },
};

export const requestLoan = async (req, res) => {
  try {
    const { category, subcategory, amount, repaymentPeriod } = req.body;
    console.log("requestLoan", category, subcategory, amount, repaymentPeriod);

    if (!category || !subcategory || !amount || !repaymentPeriod) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const selectedCategory = loanCategories[category];
    if (!selectedCategory) {
      return res.status(400).json({ message: "Invalid loan category" });
    }

    if (!selectedCategory.subcategories.includes(subcategory)) {
      return res.status(400).json({ message: "Invalid loan subcategory" });
    }

    if (amount > selectedCategory.maxLoan && selectedCategory.maxLoan !== "Based on requirement") {
      return res.status(400).json({ message: `Maximum loan amount for ${category} is PKR ${selectedCategory.maxLoan}` });
    }

    if (repaymentPeriod > selectedCategory.loanPeriod) {
      return res.status(400).json({ message: `Maximum loan period for ${category} is ${selectedCategory.loanPeriod} years` });
    }

    const loanRequest = new LoanRequest({
      userId: req.user.id,
      category,
      subcategory,
      amount,
      repaymentPeriod,
    });

    await loanRequest.save();

    return res.status(200).send({ message: "Loan request submitted successfully" });
  } catch (error) {
    console.log(error, "error");
    return res.status(500).send({ message: "Something went wrong" });
  }
};
