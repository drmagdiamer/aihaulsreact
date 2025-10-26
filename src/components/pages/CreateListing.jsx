import React, {useState} from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { getMessage } from '../../locales/messages';

const BASE_URL = "http://localhost:8777";

const OPTIONS = [
    { value: 'global' },
    { value: 'preferredProvider' },
];


function CreateListing() {
    const [selectedType, setSelectedType] = useState('');
    const [textValue, setTextValue] = useState('');
    const [companies, setCompanies] = useState([]);
    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    }
    const handleTextChange = (event) => {
        setTextValue(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Selected type:', selectedType);
        console.log('Text entered:', textValue);

        await fetchCompanies();
    };

    // Update selected companies
    const handleCompanySelect = (e) => {
        const id = e.target.value;
        setSelectedCompanies((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    const fetchCompanies = async () => {
        if (!textValue || !selectedType) {
            alert(getMessage('createListing.alertSelectTypeAndName'));
            return;
        }

        const typeId = selectedType === "global" ? 1 : 2;
        const url = `${BASE_URL}/company/${textValue}/${typeId}`;

        try {
            setLoading(true);
            const response = await fetch(url);
            const data = await response.json();
            console.log("Fetched companies:", data);
            setCompanies(data);

        } catch (error) {
            console.error("Error fetching companies:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <form id="create-listing-form" onSubmit={handleSubmit} className= "mx-3">
                <fieldset className="mb-3 mx-3">
                    <legend className="fs-6 my-1 fw-bold">{getMessage('createListing.pleaseMakeSelection')}</legend>

                    {OPTIONS.map((op) => {
                        const label = op.value === 'global' ? getMessage('createListing.optionGlobal') : getMessage('createListing.optionPreferredProvider');
                        return (
                            <div className="form-check " key={op.value}>
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="type"
                                    id={op.value}   // should we use id or value is enough here?
                                    value={op.value}
                                    checked={selectedType === op.value}
                                    onChange={handleTypeChange}
                                />
                                <label className="form-check-label" htmlFor={op.value}>
                                    {label}
                                </label>
                            </div>
                        );
                    })}
                </fieldset>

                <div>
                    <label>
                        {getMessage('createListing.enterSomeText')}
                    </label>
                    <textarea
                        className="form-control"
                        rows="4"
                        value={textValue}
                        onChange={handleTextChange}
                        placeholder={getMessage('createListing.placeholderText')}
                    />
                </div>

                <div className="mt-3">
                    <button type="submit" className="btn btn-primary" >
                        {getMessage('createListing.submit')}
                    </button>
                </div>
            </form>
            <br/>

            {loading ? ( <p>{getMessage('createListing.loadingCompanies')}</p> )  :   // Show loading state
            companies.length > 0 && (   // Load companies only if data is available
            <div className="container mt-4n mx-2">
                <h5>{getMessage('createListing.selectCompanies')}</h5>
                <div className="row">
                    { companies.map((company) => (
                        <div key={company.id} className="col-md-4 mb-3">
                            <div className="card p-3 shadow-sm">
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        value={company.id}
                                        checked={selectedCompanies.includes(company.id.toString())}
                                        onChange={handleCompanySelect}
                                        className="form-check-input me-2"
                                    />
                                    <label className="form-check-label">
                                        <strong>{company.name}</strong>
                                    </label>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div> )}
            <Footer />
        </>
    )
}

export default CreateListing;