import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

const CreateCompany = () => {
    const [name, setName] = useState('');
    const [statusId, setStatusId] = useState('0');
    const [companyTypeId, setCompanyTypeId] = useState('0');
    const [trustLevelId, setTrustLevelId] = useState('0');
    const [availableCredit, setAvailableCredit] = useState('');

    // Individual field errors
    const [nameError, setNameError] = useState('');
    const [statusError, setStatusError] = useState('');
    const [companyTypeError, setCompanyTypeError] = useState('');
    const [trustLevelError, setTrustLevelError] = useState('');
    const [creditError, setCreditError] = useState('');

    // General form error
    const [formError, setFormError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    // Enum data based on your backend enums
    const trustLevels = [
        { id: 1, name: 'Bronze' },
        { id: 2, name: 'Silver' },
        { id: 3, name: 'Gold' },
        { id: 4, name: 'Platinum' }
    ];

    const companyTypes = [
        { id: 1, name: 'company' },
        { id: 2, name: 'service provider' }
    ];

    const statuses = [
        { id: 1, name: 'active' },
        { id: 2, name: 'suspended' },
        { id: 3, name: 'under_investigation' },
        { id: 4, name: 'terminated' }
    ];

    // Individual field validation functions
    const validateName = (value) => {
        if (!value.trim()) {
            return 'Company name is required';
        }
        if (value.length > 100) {
            return 'Company name must not exceed 100 characters';
        }
        return '';
    };

    const validateStatus = (value) => {
        if (value === '0' || parseInt(value) === 0) {
            return 'Please select a status';
        }
        return '';
    };

    const validateCompanyType = (value) => {
        if (value === '0' || parseInt(value) === 0) {
            return 'Please select a company type';
        }
        return '';
    };

    const validateTrustLevel = (value) => {
        if (value === '0' || parseInt(value) === 0) {
            return 'Please select a trust level';
        }
        return '';
    };

    const validateCredit = (value) => {
        if (!value || value.trim() === '') {
            return 'Available credit is required';
        }
        const creditValue = parseFloat(value);
        if (isNaN(creditValue)) {
            return 'Available credit must be a valid decimal number';
        }
        if (creditValue < 0) {
            return 'Available credit cannot be negative';
        }
        return '';
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess('');
        setFormError('');

        // Validate all fields
        const nameErr = validateName(name);
        const statusErr = validateStatus(statusId);
        const companyTypeErr = validateCompanyType(companyTypeId);
        const trustLevelErr = validateTrustLevel(trustLevelId);
        const creditErr = validateCredit(availableCredit);

        // Set all errors
        setNameError(nameErr);
        setStatusError(statusErr);
        setCompanyTypeError(companyTypeErr);
        setTrustLevelError(trustLevelErr);
        setCreditError(creditErr);

        // If there are any errors, stop here
        if (nameErr || statusErr || companyTypeErr || trustLevelErr || creditErr) {
            return;
        }

        try {
            const token = localStorage.getItem('jwtToken');

            if (!token) {
                setFormError('You must be logged in to create a company');
                navigate('/login');
                return;
            }

            const response = await fetch('http://127.0.0.1:8015/admin/company', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: name.trim(),
                    status_id: parseInt(statusId),
                    company_type_id: parseInt(companyTypeId),
                    trust_level_id: parseInt(trustLevelId),
                    available_credit: parseFloat(availableCredit)
                }),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    setFormError('Unauthorized. Please login again.');
                    return;
                }
                setFormError('Failed to create company');
                return;
            }

            await response.json(); // don't assign if not used
            setSuccess('Company created successfully!');

            // Reset form and clear errors
            setName('');
            setStatusId('0');
            setCompanyTypeId('0');
            setTrustLevelId('0');
            setAvailableCredit('');
            setNameError('');
            setStatusError('');
            setCompanyTypeError('');
            setTrustLevelError('');
            setCreditError('');
            setFormError('');

            // Optional: Navigate after a delay
            setTimeout(() => {
                // navigate('/companies'); // Uncomment if you have a company list page
            }, 2000);

        } catch (err) {
            console.error(err);
            setFormError(err.message || 'Error creating company. Please try again.');
        }
    };

    return (
        <>
            <Header />
            <div className="container mt-4">
                <h2>Create Company</h2>
                <form onSubmit={handleSubmit} noValidate>
                    {formError && <div className="alert alert-danger fw-bold" role="alert">{formError}</div>}

                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Company Name <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className={`form-control ${nameError ? 'is-invalid' : ''}`}
                            id="name"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                if (nameError && !validateName(e.target.value)) {
                                    setNameError('');
                                }
                            }}
                            maxLength="100"
                            required
                        />
                        {nameError && <div className="text-danger mt-1">{nameError}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="status" className="form-label">
                            Status <span className="text-danger">*</span>
                        </label>
                        <select
                            className={`form-control ${statusError ? 'is-invalid' : ''}`}
                            id="status"
                            value={statusId}
                            onChange={(e) => {
                                setStatusId(e.target.value);
                                // Clear error on change if a valid option is selected
                                if (e.target.value !== '0') {
                                    setStatusError('');
                                }
                            }}
                            required
                        >
                            <option value="0">Please select</option>
                            {statuses.map(status => (
                                <option key={status.id} value={status.id}>
                                    {status.name}
                                </option>
                            ))}
                        </select>
                        {statusError && <div className="text-danger mt-1">{statusError}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="companyType" className="form-label">
                            Company Type <span className="text-danger">*</span>
                        </label>
                        <select
                            className={`form-control ${companyTypeError ? 'is-invalid' : ''}`}
                            id="companyType"
                            value={companyTypeId}
                            onChange={(e) => {
                                setCompanyTypeId(e.target.value);
                                // Clear error on change if a valid option is selected
                                if (e.target.value !== '0') {
                                    setCompanyTypeError('');
                                }
                            }}
                            required
                        >
                            <option value="0">Please select</option>
                            {companyTypes.map(type => (
                                <option key={type.id} value={type.id}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                        {companyTypeError && <div className="text-danger mt-1">{companyTypeError}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="trustLevel" className="form-label">
                            Trust Level <span className="text-danger">*</span>
                        </label>
                        <select
                            className={`form-control ${trustLevelError ? 'is-invalid' : ''}`}
                            id="trustLevel"
                            value={trustLevelId}
                            onChange={(e) => {
                                setTrustLevelId(e.target.value);
                                // Clear error on change if a valid option is selected
                                if (e.target.value !== '0') {
                                    setTrustLevelError('');
                                }
                            }}
                            required
                        >
                            <option value="0">Please select</option>
                            {trustLevels.map(level => (
                                <option key={level.id} value={level.id}>
                                    {level.name}
                                </option>
                            ))}
                        </select>
                        {trustLevelError && <div className="text-danger mt-1">{trustLevelError}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="availableCredit" className="form-label">
                            Available Credit <span className="text-danger">*</span>
                        </label>
                        <input
                            type="number"
                            className={`form-control ${creditError ? 'is-invalid' : ''}`}
                            id="availableCredit"
                            value={availableCredit}
                            onChange={(e) => {
                                setAvailableCredit(e.target.value);
                                if (creditError && !validateCredit(e.target.value)) {
                                    setCreditError('');
                                }
                            }}
                            step="0.01"
                            min="0"
                            required
                        />
                        {creditError && <div className="text-danger mt-1">{creditError}</div>}
                    </div>

                    {success && <div className="alert alert-success" role="alert">{success}</div>}

                    <button type="submit" className="btn btn-primary">
                        Create Company
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default CreateCompany;
