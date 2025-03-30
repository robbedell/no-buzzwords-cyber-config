"""
Python configuration settings for development environment.
This file can be imported by Python scripts to maintain consistent settings.
"""

# Development environment settings
DEBUG = True
ENVIRONMENT = 'development'

# Path configurations
BASE_DIR = '/Users/robbedell/Library/Mobile Documents/com~apple~CloudDocs/Development'

# Logging configuration
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {process:d} {thread:d} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'INFO',
    },
}

# Development tools settings
MAX_LINE_LENGTH = 100
USE_BLACK = True
USE_ISORT = True
USE_FLAKE8 = True

# Testing configuration
TEST_RUNNER = 'pytest'
TEST_PATTERN = 'test_*.py'
