import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/droppable';
import LeadItems from './items';

function Leads() {
    const [ads, setAds] = useState([]);
    const [discussions, setDiscussions] = useState([]);
    const [decisionMaking, setDecisionMaking] = useState([]);
    const [contractDiscussions, setContractDiscussions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://script.googleusercontent.com/a/macros/massnexgen.com/echo?user_content_key=CygdMrIAMB0suoO6x00xD18IDvX9i6nv5NVlMT6oQ9JVaNT9x0eKSX6MHXdxwmadrRUZDjAm3guwah574tcAgxEix81wncFNOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMi80zadyHLKDg4Hkln9eIVXKD7blvEXG1aAD8aA7uc1egZpWH_nqyn99Br4PUelB2ikiaS_R53ZVriprsttt1TudFOtU9UNnci9xB3h8IpkoS_dUO4aBTHL78SaE_tnO2Kg11JZ10yRUYZpTak_o22Q&lib=MzB5_Vy5tFiv0hdpkPDsPWbXQrKazms2J')
            .then((response) => {
                setAds(response.data.content.slice(1) || []); // Ignore the first row with headers
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching the ads data:', err);
                setError(err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const makeDroppable = (selector, targetFunction) => {
            $(selector).droppable({
                accept: '.draggable-item',
                drop: function (event, ui) {
                    const droppedAd = ui.helper.data('ad');
                    const droppedIndex = ui.helper.data('index');
                    console.log("Dropped ad:", droppedAd); // Log to check
                    console.log("Dropped index:", droppedIndex); // Log to check
                    targetFunction(droppedAd, droppedIndex);
                }
            });
        };

        // Apply droppable logic to each column
        makeDroppable('.discussions-column', moveLeadsToDiscussions);
        makeDroppable('.decision-making-column', moveLeadsToDecisionMaking);
        makeDroppable('.contract-discussions-column', moveLeadsToContract);
        makeDroppable('.decision-making-column',moveLeadsFromDiscussionsToDecisionMaking)
        makeDroppable('.contract-discussions-column',moveLeadsFromDiscussionsToContract)
        makeDroppable('.contract-discussions-column',moveLeadsFromDecisionToContract)
        makeDroppable('.discussions-column',moveLeadsFromDecisionMakingToDiscussions)
        makeDroppable('.decision-making-column',moveLeadsFromContractToDecisionMaking)
        makeDroppable('.discussions-column',moveLeadsFromContractToDiscussions)
        

    }, [ads, discussions, decisionMaking, contractDiscussions]);

    // Move lead from ads to discussions
    const moveLeadsToDiscussions = (ad, index) => {
        if (!discussions.includes(ad)) { // Check if ad is already in discussions
            setAds((prevAds) => prevAds.filter((_, i) => i !== index)); // Remove from ads
            setDiscussions((prevDiscussions) => [...prevDiscussions, ad]); // Add to discussions
            removeLeadFromDecisionMaking(ad); // If it's in decision making, remove it
            removeLeadFromContract(ad); // If it's in contract, remove it
        } else {
            console.log('Lead already in discussions, skipping duplicate:', ad);
        }
    };

    // Move lead from ads to decision making
    const moveLeadsToDecisionMaking = (ad, index) => {
        if (!decisionMaking.includes(ad)) { // Check if ad is already in decision making
            console.log('Moving lead to decision making:', ad); // Debug log
            setAds((prevAds) => prevAds.filter((_, i) => i !== index)); // Remove from ads
            setDecisionMaking((prevDecisionMaking) => [...prevDecisionMaking, ad]); // Add to decision making
            removeLeadFromContract(ad); // If it's in contract, remove it
            removeLeadFromDiscussions(ad); // If it's in discussions, remove it
        } else {
            console.log('Lead already in decision making, skipping duplicate:', ad);
        }
    };

    //Move lead from ads to contract discussions

    const moveLeadsToContract = (ad, index) => {
        if (!contractDiscussions.includes(ad)) { // Check if ad is already in contract discussions
            console.log('Moving lead  to contract discussions:', ad); // Debug log
            setAds((prevAds) => prevAds.filter((_, i) => i !== index)); // Remove from ads
            setContractDiscussions((prevContracts) => [...prevContracts, ad]); // Add to contract discussions
            removeLeadFromDiscussions(ad); // If it's in discussions, remove it
            removeLeadFromDecisionMaking(ad); // If it's in decision making, remove it
        } else {
            console.log('Lead already in contract discussions, skipping duplicate:', ad);
        }
    };

    //Move leads from discussion to decision making

    const moveLeadsFromDiscussionsToDecisionMaking = (ad, index) => {
        if (!decisionMaking.includes(ad)) { // Check if ad is already in decision making
            console.log('Moving lead to decision making:', ad); // Debug log
            setDiscussions((prevDiscussions) => prevDiscussions.filter((_, i) => i !== index)); // Remove from discussions
            setDecisionMaking((prevDecisionMaking) => [...prevDecisionMaking, ad]); // Add to decision making
            removeLeadFromContract(ad); // If it's in contract, remove it
            removeLeadFromDiscussions(ad); // If it's in discussions, remove it
        } else {
            console.log('Lead already in decision making, skipping duplicate:', ad);
        }
    };


    //Move leads from discussion to contract discussions

    const moveLeadsFromDiscussionsToContract = (ad, index) => {
        if (!contractDiscussions.includes(ad)) { // Check if ad is already in contract discussions
            console.log('Moving lead to contract discussions:', ad); // Debug log
            setDiscussions((prevDiscussions) => prevDiscussions.filter((_, i) => i !== index)); // Remove from discussions
            setContractDiscussions((prevContracts) => [...prevContracts, ad]); // Add to contract discussions
            removeLeadFromDiscussions(ad); // If it's in discussions, remove it
            removeLeadFromDecisionMaking(ad); // If it's in decision making, remove it
        } else {
            console.log('Lead already in contract discussions, skipping duplicate:', ad);
        }
    }



    // Move lead from decision making to contract discussions
    const moveLeadsFromDecisionToContract = (ad, index) => {
        if (!contractDiscussions.includes(ad)) { // Check if ad is already in contract discussions
            console.log('Moving lead to contract discussions:', ad); // Debug log
            setDecisionMaking((prevDecisionMaking) => prevDecisionMaking.filter((_, i) => i !== index)); // Remove from decision making
            setContractDiscussions((prevContracts) => [...prevContracts, ad]); // Add to contract discussions
            removeLeadFromDiscussions(ad); // If it's in discussions, remove it
            removeLeadFromDecisionMaking(ad); // If it's in decision making, remove it
        } else {
            console.log('Lead already in contract discussions, skipping duplicate:', ad);
        }
    };

    // Move lead from decision making to discussions
    const moveLeadsFromDecisionMakingToDiscussions = (ad, index) => {
        if (!discussions.includes(ad)) { // Check if ad is already in discussions
            console.log('Moving lead from decision making to discussions:', ad); // Debug log
            setDecisionMaking((prevDecisionMaking) => prevDecisionMaking.filter((_, i) => i !== index)); // Remove from decision making
            setDiscussions((prevDiscussions) => [...prevDiscussions, ad]); // Add to discussions
            removeLeadFromDecisionMaking(ad); // If it's in decision making, remove it
            removeLeadFromContract(ad); // If it's in contract, remove it
        } else {
            console.log('Lead already in discussions, skipping duplicate:', ad);
        }
    };

    // Move lead from contract discussions back to decision making
    const moveLeadsFromContractToDecisionMaking = (ad, index) => {
        if (!decisionMaking.includes(ad)) { // Check if ad is already in decision making
            console.log('Moving lead from contract to decision making:', ad); // Debug log
            setContractDiscussions((prevContracts) => prevContracts.filter((_, i) => i !== index)); // Remove from contract discussions
            setDecisionMaking((prevDecisionMaking) => [...prevDecisionMaking, ad]); // Add to decision making
            removeLeadFromContract(ad); // If it's in contract, remove it
            removeLeadFromDiscussions(ad); // If it's in discussions, remove it
        } else {
            console.log('Lead already in decision making, skipping duplicate:', ad);
        }
    };

    // Move lead from contract discussions back to discussions
    const moveLeadsFromContractToDiscussions = (ad, index) => {
        if (!discussions.includes(ad)) { // Check if ad is already in discussions
            console.log('Moving lead from contract to discussions:', ad); // Debug log
            setContractDiscussions((prevContracts) => prevContracts.filter((_, i) => i !== index)); // Remove from contract discussions
            setDiscussions((prevDiscussions) => [...prevDiscussions, ad]); // Add to discussions
            removeLeadFromContract(ad); // If it's in contract, remove it
            removeLeadFromDecisionMaking(ad); // If it's in decision making, remove it
        } else {
            console.log('Lead already in discussions, skipping duplicate:', ad);
        }
    };

    // Remove lead from contract discussions if it exists there
    const removeLeadFromContract = (ad) => {
        setContractDiscussions((prevContracts) => prevContracts.filter((contractAd) => contractAd !== ad)); // Remove the ad if it exists in contract discussions
    };

    // Remove lead from decision making if it exists there
    const removeLeadFromDecisionMaking = (ad) => {
        setDecisionMaking((prevDecisionMaking) => prevDecisionMaking.filter((decisionAd) => decisionAd !== ad)); // Remove the ad if it exists in decision making
    };

    //Remove lead from discussions if it exists there
    const removeLeadFromDiscussions = (ad) => {
        setDiscussions((prevDiscussions) => prevDiscussions.filter((discussionAd) => discussionAd !== ad)); // Remove the ad if it exists in discussions
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching data!</p>;

    return (
        <div className='container-fluid mt-100'>
            <div className='row'>
                {/* Leads Column */}
                <div className='col-md-3'>
                    <div className="card widget-content bg-midnight-bloom">
                        <div className="widget-content-wrapper text-white">
                            <div className="widget-content-left">
                                <div className="widget-heading">Leads</div>
                                <div className="widget-subheading">Total Leads</div>
                            </div>
                        </div>
                    </div>
                    <ul className="list-group">
                        {ads.length > 0 ? ads.map((ad, index) => (
                            <li className="list-group-item mt-3" key={index}>
                                <LeadItems ad={ad} index={index} />
                            </li>
                        )) : <p>No ads available.</p>}
                    </ul>
                </div>

                {/* Discussions Column */}
                <div className='col-md-3 discussions-column'>
                    <div className="card widget-content bg-grow-early">
                        <div className="widget-content-wrapper text-white">
                            <div className="widget-content-left">
                                <div className="widget-heading">Discussions</div>
                                <div className="widget-subheading">People Interested</div>
                            </div>
                        </div>
                    </div>
                    <ul className="list-group">
                        {discussions.length > 0 ? discussions.map((ad, index) => (
                            <li className="list-group-item mt-3" key={index}>
                                <LeadItems ad={ad} index={index} />
                            </li>
                        )) : <p>No discussions available.</p>}
                    </ul>
                </div>

                {/* Decision Making Column */}
                <div className='col-md-3 decision-making-column'>
                    <div className="card widget-content bg-arielle-smile">
                        <div className="widget-content-wrapper text-white">
                            <div className="widget-content-left">
                                <div className="widget-heading">Decision Making</div>
                                <div className="widget-subheading">Total Clients</div>
                            </div>
                        </div>
                    </div>
                    <ul className="list-group">
                        {decisionMaking.length > 0 ? decisionMaking.map((ad, index) => (
                            <li className="list-group-item mt-3" key={index}>
                                <LeadItems ad={ad} index={index} />
                            </li>
                        )) : <p>No decision making items available.</p>}
                    </ul>
                </div>

                {/* Contract Discussions Column */}
                <div className='col-md-3 contract-discussions-column'>
                    <div className="card mb-3 widget-content bg-arielle-smile1">
                        <div className="widget-content-wrapper text-white">
                            <div className="widget-content-left">
                                <div className="widget-heading">Contract Discussion</div>
                                <div className="widget-subheading">Total Clients</div>
                            </div>
                        </div>
                    </div>
                    <ul className="list-group">
                        {contractDiscussions.length > 0 ? contractDiscussions.map((ad, index) => (
                            <li className="list-group-item mt-3" key={index}>
                                <LeadItems ad={ad} index={index} />
                            </li>
                        )) : <p>No contract discussions available.</p>}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Leads;