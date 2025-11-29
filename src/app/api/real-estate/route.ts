import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { address } = await request.json();

        if (!address) {
            return NextResponse.json({ error: 'Address is required' }, { status: 400 });
        }

        const apiKey = process.env.HASDATA_API_KEY;

        if (!apiKey) {
            // Return mock data if no API key is present (Demo Mode)
            console.log('No API key found, returning mock data');
            return NextResponse.json({
                isMock: true,
                data: generateMockData(address)
            });
        }

        // Construct Zillow URL from address
        // Example: "123 Main St, San Francisco, CA" -> "123-Main-St-San-Francisco-CA"
        const formattedAddress = address.replace(/,/g, '').replace(/\s+/g, '-');
        const zillowUrl = `https://www.zillow.com/homes/${formattedAddress}_rb/`;

        // Call HasData API
        // Documentation: https://hasdata.com/zillow-api
        const response = await fetch('https://api.hasdata.com/scrape/zillow/property', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
            },
            body: JSON.stringify({
                url: zillowUrl,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('HasData API Error:', errorText);
            throw new Error(`HasData API failed: ${response.statusText}`);
        }

        const data = await response.json();

        return NextResponse.json({
            isMock: false,
            data: processHasDataResponse(data, address)
        });

    } catch (error) {
        console.error('Real Estate Analysis Error:', error);
        return NextResponse.json({ error: 'Failed to analyze property' }, { status: 500 });
    }
}

function processHasDataResponse(apiData: any, address: string) {
    // Transform HasData response to our app's format
    // Note: This mapping depends on the exact response structure of HasData
    // We'll map what we can and fallback to reasonable defaults/estimates

    const property = apiData.data || apiData; // Adjust based on actual response

    const price = property.price || property.zestimate || 0;
    const rent = property.rentZestimate || (price * 0.005);

    return {
        address: property.address || address,
        price: `$${price.toLocaleString()}`,
        status: property.homeStatus || 'For Sale',
        rent: `$${rent.toLocaleString()}/mo`,
        schoolRating: property.schools ? property.schools[0]?.rating || 7 : 8, // Simplified
        area: `${property.livingArea || 2000} sqft`,
        lotSize: property.lotSize ? `${property.lotSize} acres` : '0.25 acres',
        goodBuyScore: calculateScore(price, rent),
        verdict: calculateVerdict(price, rent),
        verdictDesc: generateVerdictDesc(price, rent),
        similar: (property.similarHomes || []).slice(0, 3).map((home: any, idx: number) => ({
            id: idx,
            address: home.address,
            price: `$${home.price.toLocaleString()}`,
            image: home.imgSrc || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80'
        }))
    };
}

function calculateScore(price: number, rent: number) {
    // Simple ROI-based score
    const annualRent = rent * 12;
    const yield_ = (annualRent / price) * 100;
    // Base score on yield (target 5-8%)
    let score = Math.min(Math.max(Math.round(yield_ * 12), 40), 98);
    return score;
}

function calculateVerdict(price: number, rent: number) {
    const score = calculateScore(price, rent);
    if (score > 80) return 'Strong Buy';
    if (score > 70) return 'Good Buy';
    return 'Neutral';
}

function generateVerdictDesc(price: number, rent: number) {
    const score = calculateScore(price, rent);
    if (score > 80) return 'Excellent rental yield potential with strong appreciation prospects.';
    if (score > 70) return 'Solid investment opportunity with stable expected returns.';
    return 'Market value is high relative to rental income. Consider negotiation.';
}

function generateMockData(address: string) {
    const mockPrice = Math.floor(Math.random() * (2000000 - 500000) + 500000);
    const mockRent = Math.floor(mockPrice * 0.005);
    const score = Math.floor(Math.random() * (95 - 60) + 60);

    return {
        address: address,
        price: `$${mockPrice.toLocaleString()}`,
        status: 'For Sale',
        rent: `$${mockRent.toLocaleString()}/mo`,
        schoolRating: Math.floor(Math.random() * 10) + 1,
        area: `${Math.floor(Math.random() * (4000 - 1500) + 1500)} sqft`,
        lotSize: `${(Math.random() * (0.5 - 0.1) + 0.1).toFixed(2)} acres`,
        goodBuyScore: score,
        verdict: score > 80 ? 'Strong Buy' : score > 70 ? 'Good Buy' : 'Neutral',
        verdictDesc: score > 80
            ? 'This property shows excellent rental yield potential and is in a high-growth neighborhood.'
            : 'Solid property but watch out for slightly higher than average property taxes in this area.',
        similar: [
            { id: 1, address: '124 Maple Ave', price: `$${(mockPrice * 0.9).toLocaleString()}`, image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80' },
            { id: 2, address: '892 Oak Lane', price: `$${(mockPrice * 1.1).toLocaleString()}`, image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80' },
            { id: 3, address: '45 Sunset Blvd', price: `$${(mockPrice * 1.05).toLocaleString()}`, image: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&q=80' },
        ]
    };
}
