from decimal import Decimal
import logging

logger = logging.getLogger(__name__)

class Currency:
    USD = 'USD'
    EUR = 'EUR'
    GBP = 'GBP'
    AED = 'AED'
    BDT = 'BDT'
    
    CHOICES = [
        (USD, 'US Dollar'),
        (EUR, 'Euro'),
        (GBP, 'British Pound'),
        (AED, 'UAE Dirham'),
        (BDT, 'Bangladeshi Taka'),
    ]

class CurrencyConverter:
    """
    Utility to handle currency conversions across the platform.
    In a real-world scenario, this would integrate with an external API 
    and use Redis for caching rates.
    """
    
    @staticmethod
    def convert(amount, from_currency, to_currency):
        # Mocking rates for now
        rates = {
            'USD': Decimal('1.0'),
            'EUR': Decimal('0.92'),
            'GBP': Decimal('0.79'),
            'AED': Decimal('3.67'),
            'BDT': Decimal('110.0'),
        }
        
        if from_currency == to_currency:
            return Decimal(amount)
            
        try:
            # First convert to USD (base)
            amount_in_usd = Decimal(amount) / rates[from_currency]
            # Then convert to target
            result = amount_in_usd * rates[to_currency]
            return result.quantize(Decimal('0.01'))
        except KeyError as e:
            logger.error(f"Currency code not found: {str(e)}")
            raise ValueError(f"Unsupported currency: {str(e)}")
