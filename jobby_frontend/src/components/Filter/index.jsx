import React, { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { Checkbox, Radio } from 'antd'

const employmentOptions = [
  { label: "Full Time", value: "FULLTIME" },
  { label: "Part Time", value: "PARTTIME" },
  { label: "Freelance", value: "FREELANCE" },
  { label: "Internship", value: "INTERNSHIP" },
]

const salaryOptions = [
  { label: "10 LPA and above", value: "1000000" },
  { label: "20 LPA and above", value: "2000000" },
  { label: "30 LPA and above", value: "3000000" },
  { label: "40 LPA and above", value: "4000000" },
]

const FilterSection = ({ title, type, filterOptions, setFilterOptions }) => {
  const [selectedOptions, setSelectedOptions] = useState({
    jobType: [],
    salaryRange: "",
  })

  const handleChange = (e) => {
    const value = e.target.value
    if (title === "jobType") {
      let updated
      if (selectedOptions.jobType.includes(value)) {
        updated = selectedOptions.jobType.filter((option) => option !== value)
      } else {
        updated = [...selectedOptions.jobType, value]
      }
      setSelectedOptions({ ...selectedOptions, jobType: updated })
    } else if (title === "salaryRange") {
      setSelectedOptions({ ...selectedOptions, salaryRange: value })
    }
  }

  useEffect(() => {
    setFilterOptions({ ...filterOptions, [title]: selectedOptions[title] })
  }, [selectedOptions])

  return (
    <Box className="flex flex-col gap-2 py-2">
      <Typography className="text-white font-bold" style={{ fontSize: "15px" }}>
        {title === "jobType" ? "Type of Employment" : "Salary Range"}
      </Typography>
      {title === "jobType" &&
        type === "checkbox" &&
        employmentOptions.map((option) => (
          <Checkbox
            value={option.value}
            onChange={handleChange}
            key={option.value}
            checked={selectedOptions.jobType.includes(option.value)}
          >
            <Typography className="text-white" style={{ fontSize: "12px" }}>
              {option.label}
            </Typography>
          </Checkbox>
        ))}
      {title === "salaryRange" &&
        type === "radio" &&
        salaryOptions.map((option) => (
          <Radio
            value={option.value}
            onChange={handleChange}
            key={option.value}
            checked={selectedOptions.salaryRange === option.value}
          >
            <Typography className="text-white" style={{ fontSize: "12px" }}>
              {option.label}
            </Typography>
          </Radio>
        ))}
    </Box>
  )
}

export default FilterSection
