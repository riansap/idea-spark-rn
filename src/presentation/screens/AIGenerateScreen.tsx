import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {generateText} from '../../infrastructure/services/HuggingFaceService';
import {MaterialIcons} from '../theme/icons';
import {colors, fonts, fontSize} from '../theme';
import Responsive from '../../utils/responsive';
import {StackNavigationProps} from '../navigation/types';

export const AIGenerateScreen = ({
  navigation,
}: StackNavigationProps<'AIGenerate'>) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="arrow-back"
            size={Responsive.fs(24)}
            color={colors.textPrimary}
          />
        </TouchableOpacity>
      ),
      headerTitle: 'AI Generate',
      headerStyle: {
        backgroundColor: colors.white,
      },
      headerTitleStyle: {
        fontFamily: fonts.SemiBold,
        fontSize: fontSize.lg,
        color: colors.textPrimary,
      },
      headerShadowVisible: false,
    });
  }, [navigation]);

  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<
    Array<{role: 'user' | 'assistant'; content: string}>
  >([]);
  const [error, setError] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [language, setLanguage] = useState<'en' | 'id'>('en');

  const sendMessage = async () => {
    setLoading(true);
    setError('');
    const newUserMessage = {role: 'user' as const, content: userInput};
    setMessages(prev => [...prev, newUserMessage]);
    setUserInput('');

    try {
      const lastMessages = messages.slice(-4);
      const context = lastMessages
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n');

      const response = await generateText({
        userInput,
        language,
        context: lastMessages.length > 0 ? context : undefined,
      });

      console.log('Response:', response);

      const newAssistantMessage = {
        role: 'assistant' as const,
        content: response.generated_text.trim(),
      };
      setMessages(prev => [...prev, newAssistantMessage]);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to generate response';
      setError(errorMessage);
      console.error('AI Generation Error:', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}>
        <View style={styles.languageSelector}>
          <TouchableOpacity
            style={[
              styles.languageButton,
              language === 'en' && styles.languageButtonActive,
            ]}
            onPress={() => setLanguage('en')}>
            <Text
              style={[
                styles.languageButtonText,
                language === 'en' && styles.languageButtonTextActive,
              ]}>
              English
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.languageButton,
              language === 'id' && styles.languageButtonActive,
            ]}
            onPress={() => setLanguage('id')}>
            <Text
              style={[
                styles.languageButtonText,
                language === 'id' && styles.languageButtonTextActive,
              ]}>
              Indonesia
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.content}>
            <View style={styles.chatContainer}>
              {messages.map((message, index) => (
                <View
                  key={index}
                  style={[
                    styles.messageContainer,
                    message.role === 'user'
                      ? styles.userMessage
                      : styles.assistantMessage,
                  ]}>
                  <Text
                    style={[
                      styles.messageText,
                      message.role === 'user'
                        ? styles.userMessageText
                        : styles.assistantMessageText,
                    ]}>
                    {message.content}
                  </Text>
                </View>
              ))}
              {loading && (
                <View style={styles.loaderContainer}>
                  <ActivityIndicator color={colors.primary} />
                </View>
              )}
              {error && (
                <View style={styles.errorContainer}>
                  <Text style={styles.error}>{error}</Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>

        <View style={styles.inputWrapper}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.chatInput}
              value={userInput}
              onChangeText={setUserInput}
              placeholder={
                language === 'en'
                  ? 'Type your message...'
                  : 'Ketik pesan Anda...'
              }
              placeholderTextColor={colors.grey400}
              editable={!loading}
              multiline
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                loading && styles.buttonDisabled,
                !userInput.trim() && styles.buttonDisabled,
              ]}
              onPress={sendMessage}
              disabled={loading || !userInput.trim()}>
              <MaterialIcons
                name={loading ? 'more-horiz' : 'send'}
                size={Responsive.fs(20)}
                color={!userInput.trim() ? colors.grey400 : colors.white}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: Responsive.spacing(4),
    backgroundColor: colors.grey100,
  },
  languageSelector: {
    flexDirection: 'row',
    paddingBottom: Responsive.spacing(10),
    justifyContent: 'center',
    gap: Responsive.spacing(10),
    backgroundColor: colors.white,
  },
  languageButton: {
    paddingHorizontal: Responsive.spacing(8),
    paddingVertical: Responsive.spacing(6),
    borderRadius: Responsive.radius(10),
    borderWidth: 1,
    borderColor: colors.primary,
  },
  languageButtonActive: {
    backgroundColor: colors.primary,
  },
  languageButtonText: {
    color: colors.primary,
    fontSize: fontSize.sm,
    fontFamily: fonts.SemiBold,
  },
  languageButtonTextActive: {
    color: colors.white,
  },
  chatContainer: {
    flex: 1,
    marginBottom: Responsive.spacing(4),
  },
  messageContainer: {
    maxWidth: '80%',
    marginVertical: Responsive.spacing(2),
    padding: Responsive.spacing(3),
    borderRadius: Responsive.radius(16),
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary,
    borderTopRightRadius: Responsive.radius(4),
    padding: Responsive.spacing(8),
  },
  assistantMessage: {
    alignSelf: 'flex-start',
    backgroundColor: colors.grey300,
    padding: Responsive.spacing(8),
  },
  messageText: {
    fontSize: fontSize.md,
    lineHeight: Responsive.fs(22),
    fontFamily: fonts.Medium,
  },
  userMessageText: {
    color: colors.white,
  },
  assistantMessageText: {
    color: colors.textPrimary,
  },
  inputWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.black,
    paddingHorizontal: Responsive.spacing(6),
    paddingVertical: Responsive.spacing(6),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: Responsive.radius(22),
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    padding: Responsive.spacing(4),
  },
  chatInput: {
    flex: 1,
    borderWidth: 0,
    backgroundColor: colors.white,
    borderRadius: Responsive.radius(12),
    paddingHorizontal: Responsive.spacing(4),
    paddingVertical: Responsive.spacing(2),
    marginHorizontal: Responsive.spacing(4),
    fontSize: fontSize.md,
    maxHeight: Responsive.h(12),
    color: colors.textPrimary,
    fontFamily: fonts.Regular,
  },
  sendButton: {
    backgroundColor: colors.primary,
    width: Responsive.w(10),
    height: Responsive.w(10),
    borderRadius: Responsive.radius(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: colors.grey200,
  },
  sendButtonText: {
    color: colors.white,
    fontSize: fontSize.lg,
    fontFamily: fonts.SemiBold,
  },
  error: {
    color: colors.error,
    marginVertical: Responsive.spacing(4),
    textAlign: 'center',
    fontFamily: fonts.Regular,
    fontSize: fontSize.sm,
  },
  loader: {
    marginTop: Responsive.spacing(4),
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: Responsive.h(15), // Space for input container
  },
  loaderContainer: {
    padding: Responsive.spacing(4),
    alignItems: 'center',
  },
  errorContainer: {
    padding: Responsive.spacing(4),
    alignItems: 'center',
    backgroundColor: colors.error + '10',
    margin: Responsive.spacing(4),
    borderRadius: Responsive.radius(12),
  },
});
